import Console from '../console/Console';
import LogHelper from '../log/LogHelper';

const app = {
	console: new Console(),
	logger: new LogHelper()
};

import rootCommand from './rootCommand';
import helpCommand from './helpCommand';

[
	rootCommand,
	helpCommand
].forEach(mod => mod(app));


export default app;