import { ExposedElectronAPI, MoekoeElectronAPI, MoekoeKugouAPI } from './electron';
import { MoekoeMessage } from './message';
import { MoekoeModal } from './modal';

declare global {
	/** 客户端 Electron API 接口 */
	const electron: ExposedElectronAPI;
	/** 客户端 API 接口 */
	const electronAPI: MoekoeElectronAPI;
	/**
	 * 内置 KuGouMusicApi 接口
	 * @since v1.7.2
	 */
	const kugouapi: MoekoeKugouAPI;
	/** 客户端内通知消息接口 */
	const $message: MoekoeMessage;
	/** 客户端内模态弹窗接口 */
	const $modal: MoekoeModal;
	interface Window {
		/** 客户端 Electron API 调用接口 */
		readonly electron: ExposedElectronAPI;
		readonly electronAPI: MoekoeElectronAPI;
		/**
		 * 内置 KuGouMusicApi 调用接口
		 * @since v1.7.2
		 */
		readonly kugouapi: MoekoeKugouAPI;
		/** 客户端内通知消息接口 */
		readonly $message: MoekoeMessage;
		/** 客户端内模态弹窗接口 */
		readonly $modal: MoekoeModal;
	}
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
	MoekoeKugouAPI
}

export * from './electron/defined';
export * from './message';
export * from './modal';
