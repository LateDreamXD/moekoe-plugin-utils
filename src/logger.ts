const logger = {
	info: (...args: any[]) => console.info('\x1b[34mi\x1b[0m', ...args),
	success: (...args: any[]) => console.log('\x1b[32m✓\x1b[0m', ...args),
	error: (...args: any[]) => console.error('\x1b[31m✗\x1b[0m', ...args),
	warn: (...args: any[]) => console.warn('\x1b[33m!\x1b[0m', ...args),

};

export default logger;