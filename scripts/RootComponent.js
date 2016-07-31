import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import SystemComponent from './system/SystemComponent';
import MenuItemComponent from './menu/MenuItemComponent';

import config from './config/config';
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

		this.state = {
			isSkewed: config.isSkewed
		};
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
			systemLog.log('aLE6oM0LDpu0+YGAiEbKf4Qnx98=', 'SWS-Accept');
			systemLog.log('ANON user (0x.ee v4.0.0-alpha)', 'New client');

			appLog.log(
				'0x.ee v4.0.0-alpha, welcome...',
				'init');

			setTimeout(() => {
				setTimeout(() => {
					var hashbang = (window.location.hash || '').trim();

					if(hashbang.length > 3 && hashbang.substr(0,3) === '#!/') {
						appLog.log(
							'opening request: ' + (hashbang.length <= 10 ? hashbang : (hashbang.substr(0,7) + '...')),
							'init');
						app.submit(hashbang.substr(3, 1) === '~'
							? new Buffer(hashbang.substr(4), 'base64').toString()
							: hashbang.substr(3));
					} else {
						appLog.log(
							'no opening request, starting default procedure',
							'init');
						app.submit('motd');
					}
				}, 250);
			}, 250);
		}, 350 + Math.random() * 100);
	}

	componentWillMount () {
		window.addEventListener('hashchange', submitFromHash.bind(null, app.logger, app.console));
	}

	render() {
		let className = 'flex-row flex-gutter ' + (this.state.isSkewed ? 'skewed' : 'straight');
		return (<oksee className={className}>
			<GridComponent className="flex-full" />
			<SystemComponent>
				<ConsoleOutputComponent
					logger={systemLog}
					maxHistory={5}
				/>
				<FlagComponent />
				<oksee-menu class="flex-row flex-fixed">
					<MenuItemComponent input='motd' />
					<MenuItemComponent input='who' />
					<MenuItemComponent input='view' />
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
