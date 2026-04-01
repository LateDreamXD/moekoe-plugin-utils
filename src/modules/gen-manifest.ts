import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const { name, version } = await import('@pkg');
const template = (await import('./template/manifest.json')).default;

export default {
	register(ctx: UtilsCtx, cli: import('cac').CAC) {
		cli.command('gen-manifest [outputFilePath]', '生成 manifest.json').action(
			(outputFilePath?: string, args?: Record<string, any>) => {
				ctx.logger.info('开始生成 manifest.json...');
				const timer = Date.now();

				const pkg = JSON.parse(readFileSync(resolve(process.cwd(), './package.json'), 'utf-8'));
				ctx.loadConfig(args?.config);
				const config = (ctx.config || { meta: {} }) as UserConfig;
				const out = resolve(process.cwd(), outputFilePath || config.manifest?.outpath || 'manifest.json');

				(template.author as any) = config.meta?.author || pkg.author || '';
				template.content_scripts = config.meta?.injects || [];
				template.description = config.meta?.description || pkg.description || '';
				template.icons = config.meta?.icons || {};
				template.minversion = config.meta?.min_moekoe_version || '';
				template.name = config.meta?.name || pkg.name || '';
				template.permissions = config.meta?.permissions || [];
				template.plugin_id = config.meta?.id || pkg.name || '';
				template.version = config.meta?.version || pkg.version || '';
				template.web_accessible_resources = config.meta?.csp || [];
				template.metadata = {
					generator: [`${name}@${version}`]
				};
				
				if(config.meta?.generator) {
					template.metadata.generator =
						typeof config.meta.generator === 'string'?
							[config.meta.generator, ...template.metadata.generator]:
							[...config.meta.generator, ...template.metadata.generator];
				}

				try {
					const noEmit = outputFilePath === 'false' || config.manifest?.outpath === false;
					if(!noEmit) writeFileSync(out, JSON.stringify(template, null, 2));
					ctx.logger.success(`生成 manifest.json 成功${ noEmit? '(不输出)': '' }，耗时: ${Date.now() - timer}ms`);
				} catch(err) {
					ctx.logger.error('生成 manifest.json 失败:', err);
					process.exit(1);
				}
			}
		)
	}
}