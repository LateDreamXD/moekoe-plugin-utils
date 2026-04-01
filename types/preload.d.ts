/// <reference types="./electron.d.ts" />
import {
	BaseReturnWithMessage,
	BaseReturnWithError,
	ExtensionInfo,
	RawExtensionInfo,
	ScannedRawExtensionInfo,
	ExtensionManifest
} from './defined';

interface ExposedElectronAPI {
	ipcRenderer: {
		send: Electron.IpcRenderer['send'];
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
	/** 打开选择文件对话框 */
	showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<BaseReturnWithMessage & {
		filePath?: string;
	}>,
	/** 打开 MV 播放窗口 */
	openMvWindow: (url: string) => Promise<boolean>,
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
}
