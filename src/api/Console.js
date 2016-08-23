import AskNicely from 'ask-nicely';

const instance = Symbol('ask-nicely instance');

export default class Console {
	constructor () {
		this[instance] = new AskNicely();
	}


	input (input, ...args) {
		let words = (input || '').match(/(?:[^\s"]+|"[^"]*")+/g) || [],
			sentences = words.reduce((sentences, word) => {
				word === '&&'
					? sentences.push([])
					: sentences[sentences.length - 1].push(word);

				return sentences;
			}, [[]]);

		return sentences.reduce((promise, sentence, i) => {
			// @NICETOHAVE: Ignore error if "&" was used instead of "&&"?
			// @TODO: find out if that is correct behaviour
			return promise
				.then(() => this[instance].interpret(sentence))
				.then(req => req.execute(...args));
		}, Promise.resolve());
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
