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
			.catch(e => {
				this.logger.error(e.message || e);
				e.stack && e.stack.split('\n').forEach(msg => this.logger.log(msg.trim(), 'debug'));
			});
	}
};

import whoCommand from './whoCommand';
import motdCommand from './motdCommand';
import rootCommand from './rootCommand';
import helpCommand from './helpCommand';
import viewCommand from './viewCommand';
import redirCommand from './redirCommand';
import colophonCommand from './colophonCommand';

[
	whoCommand,
	motdCommand,
	rootCommand,
	helpCommand,
	viewCommand,
	redirCommand,
	colophonCommand
].forEach(mod => mod(app));


export default app;