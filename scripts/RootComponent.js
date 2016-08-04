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

function  submitFromHash (event) {
	var hashbang = (window.location.hash || '').trim(),
		content = hashbang && hashbang.substr(0,3) === '#!/'
			? hashbang.substr(3,1) === '~'
			? new Buffer(hashbang.substr(4), 'base64').toString()
			: hashbang.substr(3)
			: '';

	app.submit(content);
}

function submitFromClick (event) {
	let command = event.target.getAttribute('data-command');
	if(!command)
		return;

	event.preventDefault();
	app.submit(command);
}

export default class RootComponent extends Component {
	constructor () {
		super();

		this.state = {
			isSkewed: config.isSkewed
		};
	}

	componentDidMount () {
		// Bunch of rubarb
		systemLog.log('Connected to 0x.ee, welcome ANON', '$');
		systemLog.log('0x://websocket', 'Request URL');
		systemLog.log('GET', 'Method');
		systemLog.log('101 Switching Protocols', 'Status code');
		systemLog.log('Upgrade (websocket)', 'Connection');
		systemLog.log('permessage-deflate; client_max_window_bits', 'SWS-Extensions');
		systemLog.log('MeIy8A1qAhcqufFKmIr/qw==', 'SWS-Key');
		systemLog.log('aLE6oM0LDpu0+YGAiEbKf4Qnx98=', 'SWS-Accept');
		systemLog.log('ANON user (0x.ee v4.0.0-alpha)', 'New client');

		appLog.log(
			'0x.ee v4.0.0-alpha, waiting for OK...',
			'init');
		// Start running the initial command: something from the URL hash or 'motd'
		setTimeout(() => {
			// More rubarb
			systemLog.log('OK', 'Status');

			var hashbang = (window.location.hash || '').trim();

			if(hashbang.length > 3 && hashbang.substr(0,3) === '#!/') {
				appLog.log(
					'OK, opening request: ' + (hashbang.length <= 48 ? hashbang : (hashbang.substr(0,45) + '...')),
					'init');
				app.submit(hashbang.substr(3, 1) === '~'
					? new Buffer(hashbang.substr(4), 'base64').toString()
					: hashbang.substr(3));
			} else {
				appLog.log(
					'OK, opening default request: #!/motd',
					'init');
				app.submit('motd');
			}

		}, 600);
	}

	componentWillMount () {
		window.addEventListener('hashchange', submitFromHash);
		window.addEventListener('click', submitFromClick);
	}

	componentWillUnmount () {
		window.removeEventListener('hashchange', submitFromHash);
		window.removeEventListener('click', submitFromClick);
	}

	render() {
		let className = 'flex-row flex-gutter ' + (this.state.isSkewed ? 'skewed' : 'straight');
		return (<oksee className={className}>
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
