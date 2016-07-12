import AskNicely from 'ask-nicely';

export default function (app) {
	app.console.setController((req, res) => {
		res.log('0x.ee');
	});
}