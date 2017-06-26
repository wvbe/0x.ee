import * as AskNicely from 'ask-nicely';

const instance = Symbol('ask-nicely instance');

function getArgs (input = '') {
	let words = [];
	let regex = /[^\s"]+|"([^"]*)"/gi;
	do {
		//Each call to exec returns the next regex match as an array
		var match = regex.exec(input);
		if (match != null)
		{
			//Index 1 in the array is the captured group if it exists
			//Index 0 is the matched text, which we use if no captured group exists
			words.push(match[1] ? match[1] : match[0]);
		}
	} while (match != null);

	return words;
}

export default class Console {
	constructor () {
		this[instance] = new AskNicely.Root();
	}

	input (input, ...args) {
		return getArgs(input)
			.reduce((sentences, word) => {
				word === '&&'
					? sentences.push([])
					: sentences[sentences.length - 1].push(word);

				return sentences;
			}, [[]])
			.reduce((promise, sentence, i) => {
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
