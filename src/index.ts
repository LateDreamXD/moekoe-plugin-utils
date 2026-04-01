import { cac } from 'cac';
import logger from './logger';
import loadConfig from './load-config';
import genManifest from './modules/gen-manifest';

const { name, version } = await import('@pkg');
const cli = cac('utils');
const ctx: UtilsCtx = {
	config: {},
	logger,
	loadConfig(path?: string) {
		ctx.config = loadConfig(path);
	}
};

cli.help();
cli.version(version);
cli.option('-c, --config <configFilePath>', '配置文件路径，支持 `package.json` 或 `lkp_utils.json`');

genManifest.register(ctx, cli);

console.log(`\n\t\t\x1b[1m\x1b[34m${name}\x1b[0m v\x1b[32m${version}\x1b[0m\n`);

cli.parse();
