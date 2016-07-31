import AskNicely from 'ask-nicely';


function motdController(req, res) {
	res.log(`PLACEHOLDER FOR '${req.command.name}' COMMAND`);
}

export default (app) => {
	app.console.addCommand('motd', motdController);
}