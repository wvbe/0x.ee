import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import SystemComponent from './system/SystemComponent';
import MenuItemComponent from './menu/MenuItemComponent';

import ConsoleOutputComponent from './console/ConsoleOutputComponent';
import ConsoleInputComponent from './console/ConsoleInputComponent';
import StatusButtonComponent from './status/StatusButtonComponent';
import WindowContainerComponent from './window/WindowContainerComponent';
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

	app.secondaryLogger.log('Submit "' + content + '"', 'hash');

	app.submit(content);
}

function submitFromClick (event) {
	if(event.target.getAttribute('no-capture'))
		return;

	let command = event.target.getAttribute('data-command'),
		href = event.target.getAttribute('href');

	if(command) {
		app.secondaryLogger.log('Submit "' + command + '"', 'mouse');
		app.submit(command);
	}

	else if(href) {
		app.secondaryLogger.log('Redir "' + href + '"', 'href');
		app.submit('redir ' + href);
	}

	else {
		return;
	}

	event.preventDefault();
}

function playBootSequence () {
	let bootTimeLength = app.config('bootTimeLength'),
		unsetBusyReason = app.setBusyReason('console offline');

	// Bunch of rubarb
	secondaryLogger.log('Connected to 0x.ee, welcome ANON', '$');
	secondaryLogger.log('0x://websocket', 'Request URL');
	secondaryLogger.log('GET', 'Method');
	secondaryLogger.log('101 Switching Protocols', 'Status code');
	secondaryLogger.log('Upgrade (websocket)', 'Connection');
	setTimeout(() => {
		secondaryLogger.log('permessage-deflate; client_max_window_bits', 'SWS-Extensions');
		secondaryLogger.log('MeIy8A1qAhcqufFKmIr/qw==', 'SWS-Key');
		secondaryLogger.log('aLE6oM0LDpu0+YGAiEbKf4Qnx98=', 'SWS-Accept');
		secondaryLogger.log('ANON user (0x.ee v4.0.0-alpha)', 'New client');
		secondaryLogger.log('Loading profile', 'init');
	}, bootTimeLength/2);

	primaryLogger.log('0x.ee v4.0.0-alpha, waiting for OK...', 'init');

	// Start running the initial command: something from the URL hash or 'motd'
	setTimeout(() => {
		// More rubarb
		secondaryLogger.log('OK', 'init');

		var hashbang = (window.location.hash || '').trim();

		if(hashbang.length > 3 && hashbang.substr(0,3) === '#!/') {
			let trimmedHashbang = hashbang.length <= 48
				? hashbang
				: (hashbang.substr(0,45) + '...');

			primaryLogger.log('OK, opening request: ' + trimmedHashbang, 'init');

			unsetBusyReason();

			app.submit(hashbang.substr(3, 1) === '~'
				? new Buffer(hashbang.substr(4), 'base64').toString()
				: hashbang.substr(3));
		} else {
			primaryLogger.log('OK, opening default request: #!/motd', 'init');

			unsetBusyReason();

			app.submit('motd');
		}
	}, bootTimeLength);
}


export default class RootComponent extends Component {
	constructor () {
		super();

		this.state = {
			isSkewed: app.config('isSkewed'),
			windows: []
		};
	}

	componentDidMount () {
		window.addEventListener('hashchange', submitFromHash);
		window.addEventListener('click', submitFromClick);

		playBootSequence();
	}


	componentWillUnmount () {
		window.removeEventListener('hashchange', submitFromHash);
		window.removeEventListener('click', submitFromClick);
	}

	render() {
		let className = 'flex-row flex-gutter ' + (this.state.isSkewed ? 'skewed' : 'straight');
		return (<oksee className={className}>
			<WindowContainerComponent />
			<oksee-plugboard class="flex-fluid flex-column flex-gutter flex-space-between">
				<div className="flex-column flex-gutter">
					<oksee-plugboard-version class="flex-row flex-gutter">
						<div>SOURCE: bundle.js?t={new Date().getTime()}</div>
						<div>BUILD: 367</div>
					</oksee-plugboard-version>
					<oksee-status-board class="flex-row">
						<StatusButtonComponent logger={secondaryLogger} name="connection" />
						<StatusButtonComponent logger={secondaryLogger} name="security" />
						<StatusButtonComponent logger={secondaryLogger} name="awesome" />
					</oksee-status-board>
				</div>
				<div>NERF</div>
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
