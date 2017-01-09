import Api from './api/Api';

import whoCommand from './command/whoCommand';
import echoCommand from './command/echoCommand';
import motdCommand from './command/motdCommand';
import rootCommand from './command/rootCommand';
import helpCommand from './command/helpCommand';
import viewCommand from './command/viewCommand';
import redirCommand from './command/redirCommand';
import cvCommand from './command/cvCommand';
import profileCommand from './command/profileCommand';
import testCommand from './command/testCommand';
import colophonCommand from './command/colophonCommand';

const api = new Api({
	isSkewed: false,
	bootTimeLength: 2000
});

[
	whoCommand,
	echoCommand,
	motdCommand,
	rootCommand,
	helpCommand,
	viewCommand,
	redirCommand,
	cvCommand,
	profileCommand,
	testCommand,
	colophonCommand
].forEach(mod => mod(api));


export default api;
