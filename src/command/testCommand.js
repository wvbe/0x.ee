import * as AskNicely from 'ask-nicely';
import React from 'react';
import api from '../api';
export default function (app) {
	let test = app.console
		.addCommand('test')
		.setDescription('Debug tools etc.');

	test.addCommand('timeout')
		.addParameter(new AskNicely.Parameter('time')
			.setDescription('Time, in milliseconds')
			.setResolver(val => parseInt(val, 10))
			.setDefault(1000, true))
		.setController((req, res) => {
			res.log(`Timeout (${req.parameters.time} ms)`);

			//const release = api.setBusyReason('waiting for the test timeout to run out (' + req.parameters.time + 'ms)');

			return [null, null, null,null, null]
				.reduce((deferred, _null, index) => deferred
					.then(destroyLast => {
						return new Promise(resolve => setTimeout(
							() => {
								destroyLast();
								const destroyer = api.setBusyReason( (index + 1) + '/5');
								res.log('Timer ' + index + ' ' + api.busyReasons.join(', '));
								resolve(destroyer)
							},
							req.parameters.time)
						);
					}),
					Promise.resolve(() => {}))
				.then(destroyLast => {
					destroyLast();
					//release();
					res.log('End of timeout');
				});
		});

	let testWindow = test.addCommand('window');

	testWindow.addCommand('new', (req, res) => {
		res.log('Testing new window');

		app.emit(
			'window:new',
			req.options.name || 'New window',
			<div><u>Aww yeah</u></div>);
	});
}
