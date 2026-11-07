/// <reference types="electron" />

import {
	BaseReturnWithMessage,
	BaseReturnWithError,
	ExtensionInfo,
	RawExtensionInfo,
	ScannedRawExtensionInfo,
	ExtensionManifest,
	BaseReturn
} from './defined';

interface ExposedElectronAPI {
	ipcRenderer: {
		send: Electron.IpcRenderer['send'];
		invoke: Electron.IpcRenderer['invoke'];
		on: Electron.IpcRenderer['on'];
		once: Electron.IpcRenderer['once'];
		removeListener: Electron.IpcRenderer['removeListener'];
		removeAllListeners: Electron.IpcRenderer['removeAllListeners'];
	},
	platform: NodeJS.Platform;
}

interface MoekoeElectronAPI {
	/** 获取所有已安装插件 */
	getExtensions: () => Promise<BaseReturnWithError & {
		extensions?: ExtensionInfo[] | [];
	}>,
	/** 获取所有已安装插件详细信息 */
	getExtensionsDetailed: () => Promise<ScannedRawExtensionInfo[] | []>,
	/** 重新加载插件 */
	reloadExtensions: () => Promise<BaseReturnWithMessage & { message: string }>,
	/** 打开插件安装目录 */
	openExtensionsDir: () => Promise<BaseReturnWithMessage & {
		path?: string;
	}>,
	/** 打开插件设置页弹窗 */
	openExtensionPopup: (extensionId: string, extensionName: string) => Promise<
		BaseReturnWithMessage & { extensionId?: string; }>,
	/** 安装插件 */
	installExtension: (extensionPath: string) => Promise<BaseReturnWithMessage & {
		extension?: { id: string; name: string; }
	}>,
	/** 卸载插件 */
	uninstallExtension: (extensionId: string, extensionDir: string) => Promise<
		BaseReturnWithMessage & {
			removedFromSession?: boolean;
			removedFiles?: boolean;
			path?: string;
		}
	>,
	/** 检查插件清单 */
	validateExtension: (extensionPath: string) => Promise<{
		valid: boolean;
		manifest?: ExtensionManifest;
		error?: string;
	}>,
	/** 获取插件安装路径 */
	getExtensionsDirectory: () => Promise<BaseReturnWithMessage & { path?: string; }>,
	/** 确保插件安装路径存在 */
	ensureExtensionsDirectory: () => Promise<BaseReturnWithMessage & { path?: string }>,
	/** 从 ZIP 安装插件 */
	installPluginFromZip: (zipPath: string) => Promise<BaseReturnWithMessage & {
		extension?: { id: string; name: string; };
	}>,
	/** 从 URL 安装插件 */
	installPluginFromUrl: (
		downloadUrl: string,
		extensionId?: string,
		extensionDir?: string
	) => Promise<BaseReturnWithMessage & {
		extension?: { id: string; name: string; };
	}>,
	/**
	 * 用户授权或取消授权某个插件声明的本地程序。
	 * @description 管理页调用
	 */
	setNativeHostAuthorization: (extensionId: string, hostId: string, authorized: boolean) => Promise<BaseReturnWithMessage>,
	/** 本地程序接口 */
	nativeHost: {
		/**
		 * 查询自己的本地程序状态。
		 * @description 插件 bridge/popup 调用
		 */
		getStatus: (hostId: string) => Promise<BaseReturnWithMessage>;
		/**
		 * 发送业务消息到本地程序 stdin。
		 * @description 插件 bridge/popup 调用
		 */
		send: (hostId: string, payload: any) => Promise<BaseReturnWithMessage>;
		/**
		 * 本地程序消息监听器
		 * @returns 用于取消该监听器的函数
		 */
		onMessage: (listener: (payload: any) => any) => Promise<() => void>;
	}
	/** 开始下载更新 */
	startUpdateDownload: () => Promise<BaseReturn | BaseReturnWithError & { reason: 'error' }>,
	/** 打开选择文件对话框 */
	showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<BaseReturnWithMessage & {
		filePath?: string;
	}>,
	/**
	 * 打开 MV 播放窗口
	 * @since v1.5.7
	 */
	openMvWindow: (url: string) => Promise<boolean>,
	/**
	 * 打开日志目录
	 * @since v1.6.3
	 */
	openLogPath: () => Promise<BaseReturn | { error: string | Error }>,
	/**
	 * 导出脱敏日志
	 * @since v1.6.3
	 */
	exportLog: () => Promise<{ canceled: boolean, filePath?: string } | { error: Error }>,
	/**
	 * 获取 API 服务终结点
	 * @description 若 API 服务为“始终关闭”则始终返回 `null`
	 * @since v1.7.2
	 */
	getApiModeUrl: () => Promise<{ http: string, ws: string } | null>
}

type KugouApiDevice = {
	/** 设备名称，10 位随机大写字母或数字 */
	dev: string,
	/** 唯一标识符 */
	uuid: string,
	/**
	 * MAC 地址
	 * @default '02:00:00:00:00:00'
	 */
	mac: string,
	/** MID */
	mid: string,
	/** WebGL 指纹 */
	webgl: string
}

/** 请求载体 */
type KugouApiReqPayload = {
	/** 请求参数 */
	params?: Record<string, any>,
	/**
	 * 身份验证 cookie
	 * @description 优先使用 `headers.Authorization`
	 */
	cookie?: string | Record<string, string>,
	/** 请求标头 */
	headers?: HeadersInit
}

interface MoekoeKugouAPI {
	/** 重置设备 */
	generateNewDevice: () => Promise<BaseReturn & { message?: string, device?: KugouApiDevice }>,
	/** 获取当前设备信息 */
	getDevice: () => Promise<KugouApiDevice>,
	/** 发起请求 */
	request: (path: string, payload: KugouApiReqPayload) => Promise<any>
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
	MoekoeKugouAPI
}
