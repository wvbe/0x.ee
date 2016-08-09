import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import SystemComponent from './system/SystemComponent';
import MenuItemComponent from './menu/MenuItemComponent';

import config from './config/config';
import ConsoleOutputComponent from './console/ConsoleOutputComponent';
import ConsoleInputComponent from './console/ConsoleInputComponent';
import StatusButtonComponent from './status/StatusButtonComponent';
import app from './command/main-app';
import LogHelper from './log/LogHelper';

const primaryLogger = app.primaryLogger;
const secondaryLogger = app.secondaryLogger;

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
	let command = event.target.getAttribute('data-command'),
		href = event.target.getAttribute('href');

	if(command) {
		app.submit(command);
	}

	else if(href && !event.target.getAttribute('no-capture')) {
		app.submit('redir ' + href);
	}

	else {
		return;
	}

	event.preventDefault();
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
		secondaryLogger.log('Connected to 0x.ee, welcome ANON', '$');
		secondaryLogger.log('0x://websocket', 'Request URL');
		secondaryLogger.log('GET', 'Method');
		secondaryLogger.log('101 Switching Protocols', 'Status code');
		secondaryLogger.log('Upgrade (websocket)', 'Connection');
		secondaryLogger.log('permessage-deflate; client_max_window_bits', 'SWS-Extensions');
		secondaryLogger.log('MeIy8A1qAhcqufFKmIr/qw==', 'SWS-Key');
		secondaryLogger.log('aLE6oM0LDpu0+YGAiEbKf4Qnx98=', 'SWS-Accept');
		secondaryLogger.log('ANON user (0x.ee v4.0.0-alpha)', 'New client');

		primaryLogger.log(
			'0x.ee v4.0.0-alpha, waiting for OK...',
			'init');
		// Start running the initial command: something from the URL hash or 'motd'
		setTimeout(() => {
			// More rubarb
			secondaryLogger.log('OK', 'Status');

			var hashbang = (window.location.hash || '').trim();

			if(hashbang.length > 3 && hashbang.substr(0,3) === '#!/') {
				primaryLogger.log(
					'OK, opening request: ' + (hashbang.length <= 48 ? hashbang : (hashbang.substr(0,45) + '...')),
					'init');
				app.submit(hashbang.substr(3, 1) === '~'
					? new Buffer(hashbang.substr(4), 'base64').toString()
					: hashbang.substr(3));
			} else {
				primaryLogger.log(
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
			<oksee-plugboard class="flex-column flex-gutter flex-fluid">
				<div className="flex-column flex-gutter">
					<oksee-plugboard-version class="flex-row flex-gutter">
						<div>DATE: yes</div>
						<div>BUILD: 367</div>
					</oksee-plugboard-version>
					<oksee-menu class="flex-row flex-fixed">
						<MenuItemComponent input='motd' />
						<MenuItemComponent input='who' />
						<MenuItemComponent input='view' />
						<MenuItemComponent input='--help' />
					</oksee-menu>
				</div>
				<div className="flex-column flex-gutter">
					<oksee-status-board class="flex-row">
						<StatusButtonComponent logger={secondaryLogger} name="connection" />
						<StatusButtonComponent logger={secondaryLogger} name="security" />
						<StatusButtonComponent logger={secondaryLogger} name="awesome" />
					</oksee-status-board>
				</div>
			</oksee-plugboard>
			<SystemComponent>
				<ConsoleOutputComponent
					logger={secondaryLogger}
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
						logger={primaryLogger}
					/>
					<ConsoleInputComponent
						console={app.console}
						logger={primaryLogger}
						handleSubmit={app.submit.bind(app)}
					/>
				</oksee-console>
			</SystemComponent>
		</oksee>);
	}
}
