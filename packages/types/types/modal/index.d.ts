export type MoekoeModalBaseOptions = {
	message?: string,
	messageSize?: 'small'
}

export type MoekoeModalConfirmOptions = MoekoeModalBaseOptions & {
	confirmText?: string,
	cancelText?: string
}

export type MoekoeModalPromptOptions = MoekoeModalBaseOptions & {
	defaultValue?: string
}

export interface MoekoeModal {
	readonly alert: ((message?: string | MoekoeModalBaseOptions, options?: MoekoeModalBaseOptions) => Promise<void>);
	readonly confirm: ((message?: string | MoekoeModalConfirmOptions, options?: MoekoeModalConfirmOptions) => Promise<boolean>);
	readonly prompt: ((message?: string | MoekoeModalPromptOptions, defaultValue?: string | MoekoeModalPromptOptions, options?: MoekoeModalBaseOptions) => Promise<string | void>);
	readonly hideLoading: () => void;
	readonly showLoading: () => void;
}
