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
		.first('books.*', 'review_summaries.review_count', 'review_summaries.average_rating')
		.where('id', params.id);

	if (!book) {
		error(404, 'book not found');
	}

	const comments = db
		.table('reviews')
		.select(db.raw('*, count(*) over() as total'))
		.where('book_id', params.id)
		.orderBy('created_at', 'desc')
		.limit(5);

	return {
		book,
		comments
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const now = DateTime.now().toUTC();
		const data = await request.formData();

		await db.table('comments').insert({
			id: v4(),
			username: 'admin',
			comment: data.get('comment'),
			book_id: params.id,
			created_at: now,
			updated_at: now
		});

		return { success: true };
	}
};
