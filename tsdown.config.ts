import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		utils: './src/index.ts'
	},
	deps: {
		skipNodeModulesBundle: true
	},
	banner: {
		js: '#!/usr/bin/env node'
	},
	hash: false,
	fixedExtension: false,
	format: 'esm',
	platform: 'node',
	outDir: './bin'
});