import { config } from 'dotenv';

config();

/** @type { Object.<string, import("knex").Knex.Config> } */
export default {
	development: {
		client: 'postgresql',
		connection: {
			host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			port: process.env.POSTGRES_PORT
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './seeds/dev'
		}
	}
};
