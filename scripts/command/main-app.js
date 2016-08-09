import Console from '../console/Console';
import LogHelper from '../log/LogHelper';

function turnIntoMysteriousString (str) {
	return new Buffer(str)
		.toString('base64')
		.split('')
		.slice(0,16)
		.reduce((str, letter, i) => {
			if(i && i % 4 === 0) str += '-';
			str += letter;
			return str;
		}, '')
		.toUpperCase();
}

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
				let mysteriousString = turnIntoMysteriousString(e.message || e);

				this.primaryLogger.error(e.message || e);

				e.stack && e.stack.split('\n')
					.slice(1)
					.forEach(msg => this.primaryLogger.log('    ' + msg.trim()));

				this.primaryLogger.log(mysteriousString, 'Log ID');
				setTimeout(() => {
					this.secondaryLogger.log([
						mysteriousString,
						new Date().toString()
					].join(' '), 'error');
				}, 1000);
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