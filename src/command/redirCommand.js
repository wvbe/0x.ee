import * as AskNicely from 'ask-nicely';
import React from 'react';

const regexMatchUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export default function (app) {
	app.console
		.addCommand('redir')
		.setDescription('Redirects you to a destination of your choosing.')
		.addParameter(new AskNicely.Parameter('url')
			.setDescription('The universal resource identifier of your sweet Valhalla')
			.isRequired(true)
			.addValidator(val => {
				if(!regexMatchUrl.test(val))
					throw new Error(`URL ${val} does not seem to be a real URL`);
			})
		)
		.addOption('window', 'w', 'Windowed mode (WIP)')
		.addOption('fake', 'f')
		.setController((req, res) => {
			res.log(
				'OFF-SITE HTTP REDIRECT IMMINENT',
				'notice');
			res.log('-----------------------------------------------------------------------------');
			res.log('You are being redirected to the following URL:');
			res.log(
				<div>    <a href={req.parameters.url} target="_blank">{req.parameters.url}</a></div>,
				'target');
			res.log('Nobody will be able to hear you scream.');
			res.log('-----------------------------------------------------------------------------');
			res.error('Warning, opening new internet connection on protected port: 80');
			res.log('Charging lasers...');
			return new Promise(resolve => {
				let i = 3,
					interval = setInterval(() => {
						if (!i) {
							clearInterval(interval);
							res.log('Redirecting now, goodbye lover');
							setTimeout(() => {
								!req.options.fake && window.open(req.parameters.url, '_blank');
								resolve();
							}, 250);
						} else {
							res.log('Redirect countdown: ' + i);
						}

						--i;
					}, 1000);
			});
		});
}
