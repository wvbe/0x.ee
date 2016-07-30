import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import SystemComponent from './system/SystemComponent';
import MenuItemComponent from './menu/MenuItemComponent';

import ConsoleOutputComponent from './console/ConsoleOutputComponent';
import ConsoleInputComponent from './console/ConsoleInputComponent';
import app from './command/main-app';
import LogHelper from './log/LogHelper';

const appLog = app.logger;
const systemLog = new LogHelper();
function  submitFromHash (logger, cons, event) {
	var hashbang = (window.location.hash || '').trim(),
		content = hashbang && hashbang.substr(0,3) === '#!/'
			? hashbang.substr(3,1) === '~'
			? new Buffer(hashbang.substr(4), 'base64').toString()
			: hashbang.substr(3)
			: '';

	return submitFromContent(logger, cons, content);

}
function  submitFromContent (logger, cons, content) {
	logger.input(content);
	cons.input(content, logger)
		.catch(e => logger.error(e.message || e));

}
export default class RootComponent extends Component {
	constructor () {
		super();
	}

	componentDidMount () {
		systemLog.log('Connected to 0x.ee, welcome ANON', '$');
		systemLog.log('0x://websocket', 'Request URL');
		systemLog.log('GET', 'Method');
		systemLog.log('101 Switching Protocols', 'Status code');
		systemLog.log('Upgrade (websocket)', 'Connection');
		setTimeout(() => {
			systemLog.log('permessage-deflate; client_max_window_bits', 'SWS-Extensions');
			systemLog.log('MeIy8A1qAhcqufFKmIr/qw==', 'SWS-Key');
			//setTimeout(() => {
				systemLog.log('aLE6oM0LDpu0+YGAiEbKf4Qnx98=', 'SWS-Accept');

				var hashbang = (window.location.hash || '').trim();

			if(hashbang && hashbang.substr(0,3) === '#!/') {
				app.submit(hashbang.substr(3, 1) === '~'
					? new Buffer(hashbang.substr(4), 'base64').toString()
					: hashbang.substr(3));
			} else {
				app.submit('motd');
			}

			appLog.log('0x.ee found, logging in as ANON');
				setTimeout(() => appLog.log('Login OK, welcome honoured guest!'), 250);
				setTimeout(() => appLog.log('---'), 500);
			//}, 500 + Math.random() * 300);
		}, 350 + Math.random() * 100);

		//window.addEventListener('popstate', submitFromHash.bind(null, app.logger, app.console));
	}

	componentWillMount () {
		window.addEventListener('hashchange', submitFromHash.bind(null, app.logger, app.console));
	}

	render() {
		return (<oksee className="flex-row flex-gutter">
			<GridComponent className="flex-full" />
			<SystemComponent>
				<ConsoleOutputComponent
					logger={systemLog}
					maxHistory={5}
				/>
				<FlagComponent />
				<oksee-menu class="flex-row flex-fixed">
					<MenuItemComponent input='motd' />
					<MenuItemComponent input='hepl' />
					<MenuItemComponent input='--help' />
				</oksee-menu>
				<oksee-console class="flex-fluid">
					<ConsoleOutputComponent
						logger={app.logger}
					/>
					<ConsoleInputComponent
						console={app.console}
						logger={app.logger}
						handleSubmit={app.submit.bind(app)}
					/>
				</oksee-console>
			</SystemComponent>
		</oksee>);
	}
}
