import AskNicely from 'ask-nicely';

export default class Console {
	constructor (name, controller) {
		this.app = new AskNicely(name, controller);

		this.app.setController((req, res) => {
			res('Default response');
		});

		this.outputListeners = [];
	}
	input (input) {
		// Off to instantiate the whole lot from argv user input:
		return this.app.interpret((input || '').match(/(?:[^\s"]+|"[^"]*")+/g))

			// At this point the Request object for the input is parsed out according to the configured
			// commands, options and parameters. Option/parameter resolvers have been fulfilled.
			// Continue to execute all the ancestry's preControllers and one final controller.
			.then(req => req.execute(this.output.bind(this)))

			// Yada yada yada

			// When the dust settles
			.then(req => {
				console.log('INPUT COMPLETE', input);
				console.log('Request object: ', req);
				return req;
			});

		console.log('INPUT', input);
	}
	output (output) {
		console.log('OUTPUT', output);

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