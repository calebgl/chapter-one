namespace NodeJS {
	interface ProcessEnv {
		POSTGRES_HOST: string;
		POSTGRES_PORT: string;
		POSTGRES_USER: string;
		POSTGRES_PASSWORD: string;
		POSTGRES_DATABASE: string;

		PGADMIN_DEFAULT_EMAIL: string;
		PGADMIN_DEFAULT_PASSWORD: string;
		PGADMIN_PORT: string;
	}
}
