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

export default class App extends Component {
	constructor () {
		super();
	}

	componentDidMount () {
		systemLog.log('Connected to 0x.ee, welcome ANON');
		appLog.log('0x.ee found, logging in as ANON');
		setTimeout(() => appLog.log('Login OK, welcome honoured guest!'), 250);
		setTimeout(() => appLog.log('---'), 500);
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
				<oksee-menu class="flex-row flex-gutter">
					<MenuItemComponent input='motd' />
					<MenuItemComponent input='hepl' />
					<MenuItemComponent input='about' />
				</oksee-menu>
				<oksee-console>
					<ConsoleOutputComponent
						console={app.console}
						logger={app.logger}
					/>
					<ConsoleInputComponent
						console={app.console}
						logger={app.logger}
					/>
				</oksee-console>
			</SystemComponent>
		</oksee>);
	}
}
