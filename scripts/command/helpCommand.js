import AskNicely from 'ask-nicely';
const NO_DESCRIPTION = 'No description';
import React, {Component} from 'react';
function sortByName(a, b) {
	return a.name < b.name ? -1 : 1;
}

function toParameterRow (param) {
	return [
		`<${param.name}>`,
		(param.description || NO_DESCRIPTION) + (param.required ? ' [required]' : '')
	];
}
function toOptionRow (option) {
	return [
		(option.short ? `-${option.short}` : '--') + `  --${option.name}`,
		(option.description || NO_DESCRIPTION) + (option.required ? ' [required]' : '')
	];
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
function helpController(req, res) {
	var command = req.command,
		isRoot = !command.parent;

	res.log(`# fotno help`);
	if(command.children.length) {
		res.log(``);
		res.log('## Child commands');
		command.children.sort(sortByName).forEach(child => {
			res.log(<div><a data-command={child.name}>{child.name}</a> <a data-command={child.name + ' -h'}>--help</a></div>);
			res.log('  ' + (child.description || NO_DESCRIPTION));
		});
	}

	var parameters = getAllParameters(command);
	if(parameters.length) {
		res.log('');
		res.log('## Parameters');
		parameters.forEach(param => {
			res.log(`<${param.name}>`);
			res.log('  ' + (param.description || NO_DESCRIPTION) + (param.required ? ' [required]' : ''));
		});
	}

	var options = getAllOptions(command);
	if(options.length) {
		res.log('');
		res.log('## Options');
		options.sort(sortByName).forEach(option => {
			res.log((option.short ? `-${option.short}` : '--') + `  --${option.name}`);
			res.log('  ' + (option.description || NO_DESCRIPTION) + (option.required ? ' [required]' : ''));
		});
	}
}

export default (app) => {
	app.console.addOption(new AskNicely.IsolatedOption('help')
		.setShort('h')
		.setDescription('Show usage information for this command'))
		.addPreController((req, res) => {
			if(!req.options.help)
				return;

			helpController.call(this, req, res);

			return false;
		});

}