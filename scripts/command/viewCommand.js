import AskNicely from 'ask-nicely';
import React, {Component} from 'react';

export default (app) => {
	app.console
		.addCommand('view')
		.setDescription('This command doesn\'t have a description.')
		.setController((req, res) => {
			res.log(`-----------------------------------------------------------------------------`);
			res.log(`PLACEHOLDER FOR ${req.command.name} COMMAND`);
			res.log(`-----------------------------------------------------------------------------`);
		});
}