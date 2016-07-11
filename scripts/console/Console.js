import AskNicely from 'ask-nicely';

export default class Console {
	constructor (name, controller) {
		this.app = new AskNicely(name, controller);

		this.app.setController((req, res) => {
			res.log('Default response');
		});

		this.outputListeners = [];
	}

	input (input, ...args) {
		return this.app.interpret((input || '').match(/(?:[^\s"]+|"[^"]*")+/g))
			.then(req => req.execute(...args));
	}

	output (output) {
		this.outputListeners.forEach(callback => callback(output));
	}

	onOutput (callback) {
		this.outputListeners.push(callback);
		return function () {
			this.outputListeners.splice(this.outputListeners.indexOf(callback), 1);
		}.bind(this);
	}

	addCommand (name, controller) {
		return this.app.addCommand(name, controller);
	}
}