type BaseReturn = {
	success: boolean;
}

type BaseReturnWithMessage = BaseReturn & {
	message?: string;
}

type BaseReturnWithError = BaseReturn & {
	error?: string;
}

export {
	BaseReturn,
	BaseReturnWithError,
	BaseReturnWithMessage,
}
