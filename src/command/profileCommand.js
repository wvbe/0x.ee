import * as AskNicely from 'ask-nicely';

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

			let history = app.store.get('history');
			history
				.slice(
					req.options.limit === '*' ? 0 : history.length - parseInt(req.options.limit, 10)
				)
				.forEach((item, i) => {
					res.log(item, 'hist' + i);
				});
		})
		.addOption(new AskNicely.Option('limit')
			.setShort('l')
			.setDefault(10, true)
			.setDescription('Limit the amount of commands displayed, defaults to 10. Set to "*" to show all.')
		);
}
