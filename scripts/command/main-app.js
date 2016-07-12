import Console from '../console/Console';
import LogHelper from '../log/LogHelper';

const appConsole = new Console(),
	appLogger = new LogHelper(appConsole),
	app = {
		console: appConsole,
		logger: appLogger
	};

import rootCommand from './rootCommand';
import helpCommand from './helpCommand';

[
	rootCommand,
	helpCommand
].forEach(mod => mod(app));


export default app;