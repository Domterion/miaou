declare namespace NodeJS {
	export interface ProcessEnv {
		TOKEN: string;
		EMBED_COLOR: number;
		DATABASE_URL: string;
		ENV: "development" | "production";
	}
}
