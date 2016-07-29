import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import ConsoleComponent from './console/ConsoleComponent';
import SystemComponent from './system/SystemComponent';
import MenuComponent from './menu/MenuComponent';

import ConsoleOutputComponent from './console/ConsoleOutputComponent';
import app from './command/main-app';
import LogHelper from './log/LogHelper';

const systemLog = new LogHelper();

export default class App extends Component {
	constructor () {
		super();
	}

	componentDidMount () {
		systemLog.log('Connected to 0x.ee, welcome ANON');
	}

	render() {
		return (<oksee className="flex-row flex-gutter">
			<GridComponent className="flex-full" />
			<SystemComponent>
				<ConsoleOutputComponent logger={systemLog} maxHistory={5} />
				<FlagComponent />
				<MenuComponent>motd | who | copy | view</MenuComponent>
				<ConsoleComponent
					console={app.console}
					logger={app.logger}
				/>
			</SystemComponent>
		</oksee>);
	}
}
