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
	/** 打开 MV 播放窗口 */
	openMvWindow: (url: string) => Promise<boolean>,
	/** 打开日志目录 */
	openLogPath: () => Promise<BaseReturn | { error: string | Error }>,
	/** 导出脱敏日志 */
	exportLog: () => Promise<{ canceled: boolean, filePath?: string } | { error: Error }>
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
}
