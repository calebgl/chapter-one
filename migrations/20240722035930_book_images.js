/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	await knex.schema
		.createTable('book_images', (table) => {
			table.uuid('book_id').references('id').inTable('books').onDelete('cascade');
			table.integer('image_number');
			table.binary('image_data').notNullable();
			table.integer('file_size').notNullable();
			table.string('filename').notNullable();
			table.string('mime_type').notNullable();
			table.timestamp('created_at').notNullable();
			table.timestamp('updated_at').notNullable();

			table.primary(['book_id', 'image_number']);
			table.index('filename');
			table.index('mime_type');
		})
		.alterTable('books', (table) => {
			table.dropColumn('img');
		});

	return knex.raw(`
CREATE OR REPLACE FUNCTION next_image_number(book_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
	next_number INTEGER;
BEGIN
	LOCK TABLE book_images IN EXCLUSIVE MODE;
	
	SELECT COALESCE(MAX(image_number), 0) + 1
	INTO next_number
	FROM book_images
	WHERE book_images.book_id = $1;
	
	RETURN next_number;
END;
$$ LANGUAGE plpgsql;
	`);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	await knex.schema.dropTable('book_images').alterTable('books', (table) => {
		table.binary('img');
	});

	return knex.raw('DROP FUNCTION IF EXISTS next_image_number(INTEGER);');
}
