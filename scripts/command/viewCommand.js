import AskNicely from 'ask-nicely';


function viewController(req, res) {
	res.log(`PLACEHOLDER FOR '${req.command.name}' COMMAND`);
}

export default (app) => {
	app.console.addCommand('view', viewController);
}
