import { resolve } from 'path';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

const { name, version } = await import('@pkg');
const template = (await import('./template/manifest.json')).default;

function parseInput(input: string) {
	try { return JSON.parse(input); }
	catch { return input; }
}

export default {
	register(ctx: UtilsCtx, cli: import('cac').CAC) {
		cli.command('gen-manifest', '生成插件清单')
		.option('-a, --author <author>', '插件作者').option('-I, --injects <injects>', '插件注入规则')
		.option('-d, --description <description>', '插件描述').option('-ic, --icons <icons>', '插件图标')
		.option('-m, --min-moekoe-ver <minMoekoeVer>', '插件最低支持的 MoeKoe Music 版本')
		.option('-n, --name <name>', '插件名称').option('-p, --permissions <permissions>', '插件权限')
		.option('-V, --ver <ver>', '插件版本').option('-i, --id <pluginID>', '插件 ID')
		.option('-c, --csp <csp>', '插件资源放行规则').option('-P, --popup <popup>', '插件弹窗')
		.option('-b, --background <background>', '插件后台脚本')
		.option('-A, --add, --additional <additional>', '清单额外项目')
		.option('-l, --license <license>', '插件许可证')
		.option('-g, --generator <generator>', '追加的生成器信息')
		.option('-C, --clean', '自动清理旧的插件清单')
		.option('-o, --output <outputFilePath>', '输出文件路径')
		.action(
			(args?: Record<string, any>) => {
				ctx.logger.info('开始生成插件清单...');
				const timer = Date.now();

				const pkg = JSON.parse(readFileSync(resolve(process.cwd(), './package.json'), 'utf-8'));
				ctx.loadConfig(args?.config);
				const config = (ctx.config || { meta: {} }) as UserConfig;
				const out = resolve(process.cwd(), args?.output || config.manifest?.outpath || 'manifest.json');

				if(existsSync(out) && (Object.keys(args || {}).includes('clean') || config.manifest?.clean)) {
					ctx.logger.info('清理旧的插件清单...');
					unlinkSync(out);
				}

				(template.author as any) = parseInput(args?.author) || config.meta?.author || pkg.author || '';
				template.content_scripts = parseInput(args?.injects) || config.meta?.injects || [];
				template.description = parseInput(args?.description) || config.meta?.description || pkg.description || '';
				template.icons = parseInput(args?.icons) || config.meta?.icons || {};
				template.minversion = parseInput(args?.minMoekoeVer) || config.meta?.min_moekoe_version || '';
				template.name = parseInput(args?.name) || config.meta?.name || pkg.name || '';
				template.permissions = parseInput(args?.permissions) || config.meta?.permissions || [];
				template.plugin_id = parseInput(args?.id) || config.meta?.id || '';
				template.version = parseInput(args?.ver) || config.meta?.version || pkg.version || '';
				template.web_accessible_resources = parseInput(args?.csp) || config.meta?.csp || [];

				if(args?.popup || config.meta?.popup) template.action = {
					default_title: parseInput(args?.popup)?.title || config.meta?.popup?.title || template.name,
					default_icon: parseInput(args?.popup)?.icon || config.meta?.popup?.icon || null,
					default_popup: parseInput(args?.popup)?.html || config.meta?.popup?.html,
				}

				if(args?.background) {
					const background = parseInput(args?.background);
					template.background = typeof background === 'string'?
						{ service_worker: background }:
						{ service_worker: background.script };

					if(typeof background !== 'string' && background.type)
						(template.background as any).type = background.type;
				} else if(config.meta?.background) {
					template.background =
					typeof config.meta.background === 'string'?
						{ service_worker: config.meta.background }:
						{ service_worker: config.meta?.background.script };
					
					if(typeof config.meta.background !== 'string' && config.meta?.background.type)
						(template.background as any).type = config.meta?.background.type;
				}

				if(args?.additional || config.meta?.additional)
					Object.assign(template, parseInput(args?.additional) || config.meta?.additional);

				template.metadata = {
					license: parseInput(args?.license) || config.meta?.license || pkg?.license || 'unspecified',
					generator: [`${name}@${version}`]
				};
				
				if(args?.generator) {
					const generator = parseInput(args?.generator);
					template.metadata.generator = typeof generator === 'string'?
						[generator, ...template.metadata.generator]:
						[...generator, ...template.metadata.generator];
				} else if(config.meta?.generator) {
					template.metadata.generator =
						typeof config.meta.generator === 'string'?
							[config.meta.generator, ...template.metadata.generator]:
							[...config.meta.generator, ...template.metadata.generator];
				}

				try {
					const noEmit = args?.output === 'false' || config.manifest?.outpath === false;
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