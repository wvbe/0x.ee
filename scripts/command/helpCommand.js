import AskNicely from 'ask-nicely';


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
function helpController(req, res) {
	var command = req.command,
		isRoot = !command.parent;

	res.log(`fotno help`);
	var props = [];
	(command.description || command.aliases.length) && props.push(['Command', command.name]);
	command.aliases.length && props.push(['Aliases', command.aliases.join(', ')]);
	command.description && props.push(['Summary', command.description]);

	if(props.length) {
		res.log(props);
	}
	if(command.children.length) {
		res.caption('Child commands');
		command.children.sort(sortByName).forEach(child => res.log(child.name + child.description));
	}

	if(command.parameters.length) {
		res.log('Parameters');
		res.log(command.parameters.map(toParameterRow));
	}

	var options = command.options;
	if(options.length) {
		res.log('Options');
		res.log(options.sort(sortByName).map(toOptionRow));
	}

	var examples = command.examples;
	if(examples && examples.length) {
		res.log('Examples');
		examples.forEach(fuckMartin => {
			res.log(fuckMartin.caption, fuckMartin.content);
		})
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