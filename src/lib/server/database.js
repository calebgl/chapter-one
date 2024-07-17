import Knex from 'knex';

export const db = Knex({
	client: 'pg',
	connection: {
		host: import.meta.env.POSTGRES_HOST,
		port: import.meta.env.POSTGRES_PORT,
		user: import.meta.env.POSTGRES_USER,
		password: import.meta.env.POSTGRES_PASSWORD,
		database: import.meta.env.POSTGRES_DATABASE,
		ssl: false
	},
	pool: {
		min: 2,
		max: 10
	}
});
