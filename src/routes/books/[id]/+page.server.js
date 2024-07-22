import { error } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { v4, validate } from 'uuid';
import { DateTime } from 'luxon';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (!validate(params.id)) {
		error(400, 'url not valid');
	}

	const book = await db
		.table('books')
		.leftJoin('review_summaries', 'books.id', '=', 'review_summaries.book_id')
		.first(
			'books.*',
			'review_summaries.total_review_count',
			'review_summaries.average_rating',
			'review_summaries.one_star_count',
			'review_summaries.two_star_count',
			'review_summaries.three_star_count',
			'review_summaries.four_star_count',
			'review_summaries.five_star_count'
		)
		.where('books.id', params.id);

	if (!book) {
		error(404, 'book not found');
	}

	// /** @type {Promise<any[]>} */
	const reviews = await db
		// .select(db.raw('reviews.*, count(*) over() as total'))
		.select(
			'reviews.*',
			db.raw("to_char(reviews.rating::decimal / 10, '9.9') as rating"),
			db.raw('count(*) over() as total')
		)
		.from('reviews')
		.where('reviews.book_id', params.id)
		.orderBy('reviews.created_at', 'desc')
		.limit(5);

	return {
		book,
		reviews
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const now = DateTime.now().toUTC();
		const data = await request.formData();
		const rating = Number(data.get('rating')) * 10;

		await db.transaction(async (tx) => {
			await tx.table('reviews').insert({
				id: v4(),
				username: 'admin',
				comment: data.get('comment'),
				book_id: params.id,
				rating,
				created_at: now,
				updated_at: now
			});

			let stars;
			if (rating < 20) {
				stars = 'one';
			} else if (rating < 30) {
				stars = 'two';
			} else if (rating < 40) {
				stars = 'three';
			} else if (rating < 50) {
				stars = 'four';
			} else {
				stars = 'five';
			}

			const starsColumn = `${stars}_star_count`;
			const updatedCount = await tx
				.table('review_summaries')
				.update({
					[starsColumn]: tx.raw('?? + 1', [starsColumn]),
					total_review_count: tx.raw('total_review_count + 1'),
					average_rating: tx.raw(
						'(average_rating * total_review_count + ?) / (total_review_count + 1)',
						[rating / 10]
					)
				})
				.where({ book_id: params.id });

			if (updatedCount === 0) {
				await tx('review_summaries').insert({
					book_id: params.id,
					one_star_count: 0,
					two_star_count: 0,
					three_star_count: 0,
					four_star_count: 0,
					five_star_count: 0,
					[starsColumn]: 1,
					total_review_count: 1,
					average_rating: rating / 10
				});
			}
		});

		return;
	}
};
