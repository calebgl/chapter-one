import knex from 'knex';
import {
	POSTGRES_DATABASE,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_PASSWORD
} from '$env/static/private';

export const db = knex({
	client: 'pg',
	connection: {
		host: POSTGRES_HOST,
		port: Number(POSTGRES_PORT),
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DATABASE,
		ssl: false
	},
	pool: {
		min: 2,
		max: 10
	}
});
