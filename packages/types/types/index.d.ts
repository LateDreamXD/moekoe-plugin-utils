import { ExposedElectronAPI, MoekoeElectronAPI } from './electron';

declare global {
	const electron: ExposedElectronAPI;
	const electronAPI: MoekoeElectronAPI;
	interface Window {
		readonly electron: ExposedElectronAPI;
		readonly electronAPI: MoekoeElectronAPI;
	}
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
}

export * from './electron/defined';
