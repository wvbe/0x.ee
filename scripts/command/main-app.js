import Console from '../console/Console';
import LogHelper from '../log/LogHelper';

const app = {
	console: new Console(),
	logger: new LogHelper(),
	submit: function (content) {
		window.history.pushState({
				input: content
			},
			content,
			'#!/' + (content.indexOf(' ') >= 0 ? '~' + new Buffer(content).toString('base64') : content));

		this.logger.input(content);

		return this.console.input(content, this.logger)
			.catch(e => this.logger.error(e.message || e));
	}
};

import whoCommand from './whoCommand';
import motdCommand from './motdCommand';
import rootCommand from './rootCommand';
import helpCommand from './helpCommand';
import viewCommand from './viewCommand';

[
	whoCommand,
	motdCommand,
	rootCommand,
	helpCommand,
	viewCommand
].forEach(mod => mod(app));


export default app;