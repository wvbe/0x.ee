import * as AskNicely from 'ask-nicely';
import React from 'react';
import * as styles from '../styles';

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
const rowStyle = styles.merge(
	styles.flex.horizontal);
const smallColStyle = styles.merge(
	styles.flex.fixed,
	{
		width: '15%'
	});
const largeColStyle = styles.merge(
	styles.flex.fluid);

function HelpRow ({ small, description, short }) {
	return (
		<div { ...rowStyle }>
			{ small.map((c, i) => <div key={ i } { ...smallColStyle }>{ c }</div>) }
			<div { ...largeColStyle }>{ description || NO_DESCRIPTION }</div>
		</div>
	)
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
					res.log(<HelpRow
						small={[
							<a data-command={ child.name }>{child.name}</a>
						]}
						description={ child.description || NO_DESCRIPTION}
					/>);
				});
			}

			var parameters = getAllParameters(command);
			if(parameters.length) {
				res.log('');
				res.log('## Parameters');
				parameters.forEach(param => {
					res.log(
						<HelpRow
							name={ param.name }
							description={ (param.description || NO_DESCRIPTION) + (param.required ? ' [required]' : '') }
						/>);
				});
			}

			var options = getAllOptions(command);
			if(options.length) {
				res.log('');
				res.log('## Options');
				options.sort(sortByName).forEach(option => {
					res.log(<HelpRow

						small={[
							option.short ? `-${option.short}` : '--',
							'--' + option.name
						]}
						description={ (option.description || NO_DESCRIPTION) + (option.required ? ' [required]' : '') }
						/>);
				});
			}

			return false;
		});
}
