import AskNicely from 'ask-nicely';

const instance = Symbol('ask-nicely instance');

export default class Console {
	constructor () {
		this[instance] = new AskNicely();
	}

	input (input, ...args) {
		return this[instance].interpret((input || '').match(/(?:[^\s"]+|"[^"]*")+/g))
			.then(req => req.execute(...args));
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