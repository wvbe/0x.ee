import app from '../command/main-app';
import AskNicely from 'ask-nicely';
import React, {Component} from 'react';

export default function (app) {
	let test = app.console
		.addCommand('test')
		.setDescription('Debug tools etc.');

	test.addCommand('timeout')
		.addParameter(new AskNicely.Parameter('time')
			.setDescription('Time, in milliseconds')
			.setResolver(val => parseInt(val))
			.setDefault(3000, true))
		.setController((req, res) => {
			res.log(`Timeout (${req.parameters.time} ms)`);

			return new Promise(resolve => setTimeout(() => {
				res.log('End of timeout');
				resolve();
			}, req.parameters.time));
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