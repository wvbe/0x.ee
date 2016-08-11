import Console from '../console/Console';
import LogHelper from '../log/LogHelper';
import EventEmitter from '../util/EventEmitter';

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

var fakeErrorSendTimeout = null,
	fakeErrorSendBufferLength = 0;

class App extends EventEmitter {
	constructor () {
		super();

		this._inputQueue = [];

		this.busyReasons = [];

		this.console = new Console();
			this.primaryLogger = new LogHelper();
			this.secondaryLogger = new LogHelper();
	}

	submit (content) {
		if(this.busyReasons.length) {
			this._inputQueue.push(content);
			return;
		}
		window.history.pushState({
				input: content
			},
			content,
			'#!/' + (content.indexOf(' ') >= 0 ? '~' + new Buffer(content).toString('base64') : content));

		this.primaryLogger.input(content);
		var unsetBusy = this.setBusyReason(`executing: ${content}`);
		this.console.input(content, this.primaryLogger)
			.catch(e => {

				let mysteriousString = turnIntoMysteriousString(e.message || e);

				this.primaryLogger.error(e.message || e);

				e.stack && e.stack.split('\n')
					.slice(1)
					.forEach(msg => this.primaryLogger.log('    ' + msg.trim()));

				this.primaryLogger.log(mysteriousString, 'Log ID');
				setTimeout(() => {
					this.secondaryLogger.log([
						'Exception',
						mysteriousString,
						new Date().toString()
					].join(' '), `debug`);
				}, 250);

				++fakeErrorSendBufferLength;

				if(fakeErrorSendTimeout)
					clearTimeout(fakeErrorSendTimeout);

				fakeErrorSendTimeout = setTimeout(() => {
					fakeErrorSendTimeout = null;

					this.secondaryLogger.log(`Send ExceptionReport (${fakeErrorSendBufferLength})`, `debug`);
					fakeErrorSendBufferLength = 0;

					setTimeout(() => {
						this.secondaryLogger.log(`Send ExceptionReport OK`, `debug`);
					}, 500 + Math.random() * 500)
				}, 3000);
			})
			.then(() => {
				unsetBusy();
				if(this._inputQueue.length)
					this.submit(this._inputQueue.shift());
			});
	}

	setBusyReason (reason) {
		if(this.busyReasons.indexOf(reason) >= 0)
			throw new Error('Already in this busy state');

		this.busyReasons.push(reason);

		this.emit('busy', this.busyReasons);

		return () => {
			this.busyReasons.splice(this.busyReasons.indexOf(reason), 1);
			this.emit('busy', this.busyReasons);
		}
	}
}

import whoCommand from './whoCommand';
import motdCommand from './motdCommand';
import rootCommand from './rootCommand';
import helpCommand from './helpCommand';
import viewCommand from './viewCommand';
import redirCommand from './redirCommand';
import testCommand from './testCommand';
import colophonCommand from './colophonCommand';

const app = new App();

[
	whoCommand,
	motdCommand,
	rootCommand,
	helpCommand,
	viewCommand,
	redirCommand,
	testCommand,
	colophonCommand
].forEach(mod => mod(app));


export default app;