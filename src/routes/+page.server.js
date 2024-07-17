import { error } from '@sveltejs/kit';
import { db } from '$lib/server/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 20);

	if (isNaN(page) || isNaN(limit)) {
		error(400, 'page and limit must be integers.');
	}

	if (limit < 1 || page < 1) {
		error(400, 'page and limit must be positive integers.');
	}

	return {
		books: await db
			.table('books')
			.select()
			.offset((page - 1) * limit)
			.limit(limit)
	};
}
