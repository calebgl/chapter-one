import { db } from '$lib/server/database';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const image = await db
		.select(
			'book_images.image_data',
			'book_images.mime_type',
			'book_images.file_size',
			'book_images.updated_at'
		)
		.from('book_images')
		.where('book_images.book_id', params.id)
		.first();

	return new Response(image.image_data, {
		headers: {
			'content-type': image.mime_type,
			'content-length': image.file_size,
			'last-modified': image.updated_at
		}
	});
}
