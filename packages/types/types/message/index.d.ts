export type MoekoeMessageType = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface MoekoeMessage {
	readonly error: (content: string, duration?: number) => number;
	readonly info: (content: string, duration?: number) => number;
	readonly message: (content: string, type?: MoekoeMessageType, duration?: number) => number;
	readonly success: (content: string, duration?: number) => number;
	readonly waring: (content: string, duration?: number) => number;
}
