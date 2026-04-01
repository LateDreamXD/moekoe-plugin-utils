import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import logger from './logger';

const supportedFiles = ['lkp_utils.json', 'package.json'];

const readFile = (path: string) =>
 JSON.parse(readFileSync(path, 'utf-8'));

const load = (path?: string): UserConfig => {
	if(!path) {
		let config: UserConfig;
		const result = supportedFiles.some(file => {
			const fullPath = resolve(process.cwd(), file);
			if(existsSync(fullPath)) {
				config = file === 'package.json'?
					readFile(fullPath)?.lkp_config: readFile(fullPath);
				logger.info(`配置文件：${file}`);
				return true;
			}
		});
		if(!result) logger.info('未找到支持的配置文件，将使用默认配置');
		return config;
	} else {
		const isPackageJson = path.endsWith('package.json');
		path = resolve(process.cwd(), path);
		if(!existsSync(path)) {
			logger.error(`指定的配置文件不存在: ${path}`);
			process.exit(1);
		};
		logger.info(`配置文件：${path}`);
		const data = readFile(path);
		return isPackageJson? data?.lkp_config: data;
	}
}

export default load;
