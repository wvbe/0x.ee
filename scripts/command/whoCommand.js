import AskNicely from 'ask-nicely';


function whoController(req, res) {
	res.log(`PLACEHOLDER FOR '${req.command.name}' COMMAND`);
}

export default (app) => {
	app.console.addCommand('who', whoController);
}