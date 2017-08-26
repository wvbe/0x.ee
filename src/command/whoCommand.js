import React from 'react';

export default function (app) {
	app.console
		.addCommand('who')
		.setDescription('Describes various ways to get in touch with the site owner.')
		.addOption('social', 's', 'Include links to numerous social media profiles')
		.addOption('email', 'e', 'Show alternative email addresses')
		.setController((req, res) => {
			res.log(
				'Minnebo,\nWybe Paul',
				'Name');

			res.log(
				'10-JUL-1988 (M)\ns\'Gravenhage, NL',
				'Birth');

			res.log('');
			res.log(
				<a href="mailto:wybe@x-54.com" target="_blank">wybe@x-54.com</a>,
				'Email');

			if(req.options.email) {
				[
					'wybe.x54@gmail.com',
					'wybe.minnebo@liones.nl',
					'wybe@hotmail.com'
				].forEach(add => res.log(
					<a href={'mailto:' + add} target="_blank">{add}</a>,
					'Email alt'));
			} else {
				res.log('');
				res.log(
					<div>List alternative addresses: <a data-command="who --email">who --email</a></div>,
					'More');
			}


			if(req.options.social) {
				res.log('');
				res.log(
					<a href="https://github.com/wvbe" target="_blank">https://github.com/wvbe</a>,
					'github');
				res.log(
					<a href="https://linkedin.com/in/wybeminnebo" target="_blank">https://linkedin.com/in/wybeminnebo</a>,
					'linkedin');
				res.log(
					<a href="https://facebook.com/wvvbe" target="_blank">https://facebook.com/wvvbe</a>,
					'facebook');
				res.log(
					<a href="https://twitter.com/wvbe" target="_blank">https://twitter.com/wvbe</a>,
					'twitter');
				res.log(
					<a href="https://plus.google.com/u/1/107412884090650002154" target="_blank">https://plus.google.com/u/1/107412884090650002154</a>,
					'google+');
				res.log(
					<a href="https://pinterest.com/wvbe" target="_blank">https://pinterest.com/wvbe</a>,
					'pinterest');
				res.log(
					<a href="https://youtube.com/user/wybe" target="_blank">https://youtube.com/user/wybe</a>,
					'youtube');
			} else {
				if (req.options.email)
					res.log('');
				res.log(
					<div>List social media profiles: <a data-command="who --social">who --social</a></div>,
					'More');
			}
		});
}
