/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema
		.createTable('books', (table) => {
			table.uuid('id').primary();
			table.string('title').notNullable();
			table.text('description');
			table.text('img');
			table.string('author').notNullable();
			table.decimal('price', 6, 2).notNullable();
			table.enu('language', ['english', 'spanish']).notNullable();
			table.string('publisher').notNullable();
			table.integer('pages').notNullable();
			table.date('publication_date').notNullable();
			table.datetime('created_at').notNullable();
			table.datetime('updated_at').notNullable();
		})
		.createTable('reviews', (table) => {
			table.uuid('id').primary();
			table.string('username').notNullable();
			table.string('comment').notNullable();
			table.decimal('rating', 2, 1).notNullable();
			table.uuid('book_id').notNullable().references('id').inTable('books').onDelete('cascade');
			table.timestamp('created_at').notNullable();
			table.timestamp('updated_at').notNullable();
		})
		.createTable('review_summaries', (table) => {
			table.uuid('book_id').primary().references('id').inTable('books').onDelete('cascade');
			table.bigint('review_count').notNullable();
			table.decimal('average_rating', 2, 1).notNullable();
		});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('books').dropTable('reviews').dropTable('review_summaries');
}
