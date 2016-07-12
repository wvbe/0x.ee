import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import ConsoleComponent from './console/ConsoleComponent';
import SystemComponent from './system/SystemComponent';
import MenuComponent from './menu/MenuComponent';

import app from './command/main-app';

export default class App extends Component {
	constructor () {
		super();
	}

	render() {
		return (<oksee className="flex-row flex-gutter">
			<GridComponent className="flex-full" />
			<SystemComponent>
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
