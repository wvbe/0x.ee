export default (app) => {
	app.console
		.addCommand('colophon')
		.setDescription('This command doesn\'t have a description.')
		.setController((req, res) => {
			res.log(`This site is built on the following technologies:`);
			res.log(`- webpack`);
			res.log(`- react`);
		});
}
