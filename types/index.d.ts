import { ExposedElectronAPI, MoekoeElectronAPI } from './preload';

declare global {
	const electron: ExposedElectronAPI;
	const electronApi: MoekoeElectronAPI;
	interface Window {
		readonly electron: ExposedElectronAPI;
		readonly electronApi: MoekoeElectronAPI;
	}
}

export {
	ExposedElectronAPI,
	MoekoeElectronAPI,
}

export * from './defined';
