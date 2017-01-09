import React, {Component} from 'react';
import {render} from 'react-dom';

import MenuItemComponent from './menu/MenuItemComponent';

import logoImageUrl from './logo.png';
import ConsoleOutputComponent from './console/ConsoleOutputComponent';
import ConsoleInputComponent from './console/ConsoleInputComponent';
import WindowContainerComponent from './window/WindowContainerComponent';

import api from './api';
import * as styles from './styles';

const primaryLogger = api.primaryLogger;
const secondaryLogger = api.secondaryLogger;

function  submitFromHash (event) {
	var hashbang = (window.location.hash || '').trim(),
		content = hashbang && hashbang.substr(0,3) === '#!/'
			? hashbang.substr(3,1) === '~'
			? new Buffer(hashbang.substr(4), 'base64').toString()
			: hashbang.substr(3)
			: '';

	api.secondaryLogger.log('Submit "' + content + '"', 'hash');

	api.submit(content);
}

function submitFromClick (event) {
	if(event.target.getAttribute('no-capture'))
		return;

	let command = event.target.getAttribute('data-command'),
		href = event.target.getAttribute('href');

	if(command) {
		api.secondaryLogger.log('Submit "' + command + '"', 'mouse');
		api.submit(command);
	}

	else if(href) {
		api.secondaryLogger.log('Redir "' + href + '"', 'href');
		api.submit('redir ' + href);
	}

	else {
		return;
	}

	event.preventDefault();
}

function playBootSequence () {
	let bootTimeLength = api.config('bootTimeLength'),
		unsetBusyReason = api.setBusyReason('console offline');

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
		let lastVisit = api.store.get('last-submit'),
			history = api.store.get('history');
		if(lastVisit) {
			primaryLogger.log(`Welcome back, last visited on: ${new Date(parseInt(lastVisit))}`);
			primaryLogger.log(`  found ${history.length} commands in your history`);
			primaryLogger.log(<div>Type <a data-command="profile clear">profile clear</a> to wipe your data or <a data-command="profile history">profile history</a> to view.</div>);
		} else {
			primaryLogger.log(`Looks like you haven't visited before, welcome!`);
		}
	}, bootTimeLength * 0.7);

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

			api.submit(hashbang.substr(3, 1) === '~'
				? new Buffer(hashbang.substr(4), 'base64').toString()
				: hashbang.substr(3));
		} else {
			primaryLogger.log('OK, opening default request: #!/motd', 'init');

			unsetBusyReason();

			api.submit('motd');
		}
	}, bootTimeLength);
}

export default class RootComponent extends Component {
	constructor () {
		super();

		this.state = {
			isSkewed: api.config('isSkewed'),
			windows: []
		};

		this.nerfPerDerpDestroyer = null;
	}

	componentDidMount () {
		window.addEventListener('hashchange', submitFromHash);
		window.addEventListener('click', submitFromClick);

		playBootSequence();
	}


	componentWillUnmount () {
		window.removeEventListener('hashchange', submitFromHash);
		window.removeEventListener('click', submitFromClick);

		clearInterval(this.nerfPerDerpDestroyer);
	}

	render() {

		const bannerHeight = 100;
		const style = styles.merge(
			styles.display.block,
			{
				margin: 'auto'
			});
		const bannerLeftStyle = styles.merge(styles.flex.vertical);
		const bannerMiddleStyle = styles.merge({
			height: bannerHeight,
			width: 'auto'
		});
		const bannerRightStyle = styles.merge(
			styles.display.block,
			styles.steno.micro,
			{
				textAlign: 'right',
				height: bannerHeight
			});
		const consoleStyle = styles.merge({
			height: 200
		});
		return (<div { ...style }>
			<div { ...styles.merge(styles.flex.horizontal) }>
				<oksee-menu  { ...bannerLeftStyle }>
					<MenuItemComponent input='motd' />
					<MenuItemComponent input='who' />
					<MenuItemComponent input='view' />
					<MenuItemComponent input='cv' />
					<MenuItemComponent input='--help' />
				</oksee-menu>
				<img src={ logoImageUrl } { ...bannerMiddleStyle } />
				<div { ...bannerRightStyle }>
					<ConsoleOutputComponent
						logger={secondaryLogger}
						maxHistory={5}
					/>
				</div>
			</div>
			<oksee-console { ...consoleStyle }>
				<ConsoleOutputComponent
					logger={primaryLogger}
					maxHistory={100}
				/>
				<ConsoleInputComponent
					console={api.console}
					logger={primaryLogger}
					handleSubmit={api.submit.bind(api)}
				/>
			</oksee-console>
		<WindowContainerComponent />
</div>);
	}
}
