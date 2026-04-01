type ExtensionInfo = {
	/** chrome 生成的插件 ID */
	id: string;
	/** 插件 ID */
	pluginId?: string;
	/** 插件名称 */
	name: string;
	/** 插件安装目录 */
	directory?: string;
	/** 插件版本 */
	version: string;
	/** 插件是否被启用 */
	enabled: boolean;
	/** 插件描述 */
	description: string;
	/** 插件作者 */
	author?: string;
	/** 插件作者主页 */
	authorUrl?: string;
	/** 插件权限列表 */
	permissions: string[] | [];
	/** 插件图标 base64 URL */
	iconData: string | null;
	/** 插件是否适配 MoeKoe Music */
	moeKoeAdapted: boolean;
	/** 插件 MoeKoe Music 最低版本要求 */
	minversion?: string;
}

type RawExtensionInfo = {
	name: string;
	version: string;
	description?: string;
	author?: string | {
		name: string;
		email?: string;
		url?: string;
	};
	permissions: string[] | [];
	path: string;
	size: number;
	lastModified: Date;
	manifest: ExtensionManifest;
}

type ScannedRawExtensionInfo = RawExtensionInfo & {
	directory: string;
	installed: boolean;
}

type ExtensionManifest = {
	manifest_version: number;
	moekoe?: boolean;
	minversion?: string;
	name: string;
	plugin_id?: string;
	version: string;
	description?: string;
	author?: string | {
		name: string;
		email?: string;
		url?: string;
	};
	permissions?: string[] | [];
	content_scripts?: {
		matches: string[];
		js: string[];
		css?: string[];
		run_at?: string;
	}[] | [];
	icons?: Record<string, string> | {};
	web_accessible_resources?: {
		matches: string[];
		resources: string[];
	}[] | [];
}

export {
	ExtensionInfo,
	RawExtensionInfo,
	ScannedRawExtensionInfo,
	ExtensionManifest,
}
