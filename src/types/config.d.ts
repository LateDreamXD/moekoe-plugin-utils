type UserConfig = {
	manifest?: {
		outpath?: string | false;
	};
	meta?: {
		name?: string;
		id?: string;
		description?: string;
		version?: string;
		min_moekoe_version?: string;
		author?: string | {
			name: string;
			email?: string;
			url?: string;
		};
		permissions?: string[] | [];
		icons?: Record<string, string> | {};
		injects?: {
			matches: string[];
			js: string[];
			css?: string[];
			run_at?: string;
		}[] | [];
		csp?: {
			matches: string[];
			resources: string[];
		}[] | [];
		generator?: string | string[] | [];
	}
}

type UtilsCtx = {
	config: UserConfig;
	logger: typeof import('../logger').default;
	loadConfig: Function;
}
