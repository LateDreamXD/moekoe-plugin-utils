import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		utils: './src/index.ts'
	},
	deps: {
		skipNodeModulesBundle: true
	},
	hash: false,
	fixedExtension: false,
	format: 'esm',
	platform: 'node',
	outDir: './bin'
});