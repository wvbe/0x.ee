import AskNicely from 'ask-nicely';

const instance = Symbol('ask-nicely instance');

export default class Console {
	constructor () {
		this[instance] = new AskNicely();


		this.outputListeners = [];
	}

	input (input, ...args) {
		return this[instance].interpret((input || '').match(/(?:[^\s"]+|"[^"]*")+/g))
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

	addCommand () {
		return this[instance].addCommand.apply(this[instance], arguments);
	}
	addOption () {
		return this[instance].addOption.apply(this[instance], arguments);
	}
	addParameter () {
		return this[instance].addParameter.apply(this[instance], arguments);
	}
	setDescription () {
		return this[instance].setDescription.apply(this[instance], arguments);
	}
	setController () {
		return this[instance].setController.apply(this[instance], arguments);
	}
	addPreController () {
		return this[instance].addPreController.apply(this[instance], arguments);
	}
}