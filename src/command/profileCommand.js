import AskNicely from 'ask-nicely';
import React, {Component} from 'react';

const regexMatchUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export default function (app) {
	let profileCommand = app.console
		.addCommand('profile');

	profileCommand
		.addCommand('clear', (req, res) => {
			res.log('Wiping command history...');
			app.store.remove('history');
			app.store.remove('last-submit');

			return new Promise(resolve => setTimeout(resolve, 500))
				.then(x => res.log('All done.'));
		});

	profileCommand
		.addCommand('history', (req, res) => {
			res.log('Dump command history...');
			res.log('-----------------------');

			app.store.get('history').forEach(item => {
				res.log(item);
			});
		});
}
