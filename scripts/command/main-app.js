import Console from '../console/Console';
import LogHelper from '../log/LogHelper';

const app = {
	console: new Console(),
	primaryLogger: new LogHelper(),
	secondaryLogger: new LogHelper(),
	submit: function (content) {
		window.history.pushState({
				input: content
			},
			content,
			'#!/' + (content.indexOf(' ') >= 0 ? '~' + new Buffer(content).toString('base64') : content));

		this.primaryLogger.input(content);

		return this.console.input(content, this.primaryLogger)
			.catch(e => {
				this.primaryLogger.error(e.message || e);
				this.secondaryLogger.log([
					new Buffer(e.stack || e.message || e).toString('base64').substr(0,16),
					new Date().toString()
				].join(' '), 'error');
				e.stack && e.stack.split('\n').forEach(msg => this.primaryLogger.log(msg.trim(), 'debug'));
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