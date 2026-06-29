import { ExposedElectronAPI, MoekoeElectronAPI } from './electron';
import { MoekoeMessage } from './message';
import { MoekoeModal } from './modal';

declare global {
	const electron: ExposedElectronAPI;
	const electronAPI: MoekoeElectronAPI;
	const $message: MoekoeMessage;
	const $modal: MoekoeModal;
	interface Window {
		readonly electron: ExposedElectronAPI;
		readonly electronAPI: MoekoeElectronAPI;
		readonly $message: MoekoeMessage;
		readonly $modal: MoekoeModal;
	}
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
}

export * from './electron/defined';
export * from './message';
export * from './modal';
