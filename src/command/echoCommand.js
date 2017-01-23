export default function (app) {
	app.console
		.addCommand('echo')
		.addParameter('text')
		.setController((req, res) => {
			res.log(req.parameters.text || '');
		});
}
