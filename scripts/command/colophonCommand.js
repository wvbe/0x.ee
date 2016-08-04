import AskNicely from 'ask-nicely';

function whoController(req, res) {
	res.log(`This site is built on the following technologies:`);
	res.log(`- webpack`);
	res.log(`- react`);
	res.log(``);
	res.log(`Credits for the motd ASCII skull art: Gilo95`);
	res.log(`    Retrieved from: http://www.chris.com/ascii/index.php?art=people/skeletons`);
}

export default (app) => {
	app.console.addCommand('colophon', whoController);
}