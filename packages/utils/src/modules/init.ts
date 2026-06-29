import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import template from './template/lkp_utils.json';

export default {
	register(ctx: UtilsCtx) {
		ctx.cli.command('init', '初始化配置文件')
			.action(() => {
				const configPath = resolve(process.cwd(), 'lkp_utils.json');
				if(existsSync(configPath)) {
					ctx.logger.info('配置文件已存在');
					process.exit(0);
				}
				writeFileSync(configPath, JSON.stringify(template, null, 2), 'utf-8');
				ctx.logger.success('成功创建配置文件');
			});
	}
}
