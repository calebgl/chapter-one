import { v4 } from 'uuid';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const bookId = v4();

	await knex('books').del();
	await knex('books').insert([
		{
			id: bookId,
			title: 'The Way of Kings',
			description: null,
			img: null,
			author: 'Brandon Sanderson',
			price: 9.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1280',
			publication_date: '2011-05-24',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			title: 'Words of Radiance',
			description: null,
			img: null,
			author: 'Brandon Sanderson',
			price: 7.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1088',
			publication_date: '2014-03-04',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			title: 'Oathbringer',
			description: null,
			img: null,
			author: 'Brandon Sanderson',
			price: 8.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1248',
			publication_date: '2017-11-24',
			created_at: new Date(),
			updated_at: new Date()
		}
	]);

	await knex('reviews').del();
	await knex('reviews').insert([
		{
			id: v4(),
			username: 'admin',
			comment: 'Great book!',
			rating: 5,
			book_id: bookId,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			username: 'admin',
			comment: 'I would buy it again!',
			rating: 4.9,
			book_id: bookId,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			username: 'admin',
			comment: 'My collection keeps growings!',
			rating: 4.8,
			book_id: bookId,
			created_at: new Date(),
			updated_at: new Date()
		}
	]);

	await knex('review_summaries').del();
	await knex('review_summaries').insert({
		book_id: bookId,
		review_count: 3,
		average_rating: 4.9
	});
}
