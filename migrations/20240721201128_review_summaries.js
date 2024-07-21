/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.alterTable('review_summaries', (table) => {
		table.renameColumn('review_count', 'total_review_count');
		table.integer('one_star_count');
		table.integer('two_star_count');
		table.integer('three_star_count');
		table.integer('four_star_count');
		table.integer('five_star_count');
		table.timestamp('created_at');
		table.timestamp('updated_at');
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.alterTable('review_summaries', (table) => {
		table.renameColumn('total_review_count', 'review_count');
		table.dropColumn('one_star_count');
		table.dropColumn('two_star_count');
		table.dropColumn('three_star_count');
		table.dropColumn('four_star_count');
		table.dropColumn('five_star_count');
		table.dropColumn('created_at');
		table.dropColumn('updated_at');
	});
}
