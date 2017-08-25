import * as AskNicely from 'ask-nicely';
import React from 'react';

const NO_DESCRIPTION = 'No description';

function sortByName(a, b) {
	return a.name < b.name ? -1 : 1;
}

function getCommandHierarchy (command) {
	let chain = [command],
		nextCommand = command;
	while(nextCommand.parent) {
		chain.push(nextCommand.parent);
		nextCommand = nextCommand.parent;
	}
	return chain;
}

function getAllOptions (command) {
	return getCommandHierarchy(command).reduce((options, command) => options.concat(command.options), []);
}

function getAllParameters (command) {
	return getCommandHierarchy(command).reduce((options, command) => options.concat(command.parameters), []);
}

export default (app) => {
	app.console
		.addOption(new AskNicely.IsolatedOption('help')
			.setShort('h')
			.setDescription('Show usage information for this command')
		)
		.addPreController((req, res) => {
			// If the help flag is not set, the precontroller is exited early
			if(!req.options.help)
				return;

			let command = req.command,
				isRoot = !command.parent;

			res.log(`# wyb.be --help`);

			if(isRoot) {
				res.log('');
				res.log(`This site is controlled through the terminal you see here. Use the listed commands and options to your advantage. For any command you can find more instructions by using the "--help" flag.`);
				res.log('');
				res.log(<div>You can always contact me if you have other questions: type "<a data-command="who --email">who --email</a>"</div>)
			}


			if(command.children.length) {
				res.log(``);
				res.log('## Child commands');
				command.children.sort(sortByName).forEach(child => {
					res.log(<div className="log-row">
						<div className="log-col-s"><a data-command={child.name}>{child.name}</a></div>
						<div className="log-col-s"><a data-command={child.name + ' -h'}>--help</a></div>
						<div className="log-col-x">{(child.description || NO_DESCRIPTION)}</div>
					</div>);
				});
			}

			var parameters = getAllParameters(command);
			if(parameters.length) {
				res.log('');
				res.log('## Parameters');
				parameters.forEach(param => {
					res.log(<div className="log-row">
						<div className="log-col-s">&#60;{param.name}&#62;</div>
						<div className="log-col-x">{(param.description || NO_DESCRIPTION)}{param.required ? ' [required]' : ''}</div>
					</div>);
				});
			}

			var options = getAllOptions(command);
			if(options.length) {
				res.log('');
				res.log('## Options');
				options.sort(sortByName).forEach(option => {
					res.log(<div className="log-row">
						<div className="log-col-xs">{option.short ? `-${option.short}` : '--'}</div>
						<div className="log-col-s">--{option.name}</div>
						<div className="log-col-x">{(option.description || NO_DESCRIPTION)}{option.required ? ' [required]' : ''}</div>
					</div>);
				});
			}

			return false;
		});
}
