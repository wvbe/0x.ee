import './scaffolding.scss';

import React, {Component} from 'react';

import GridComponent from './grid/GridComponent';
import FlagComponent from './flag/FlagComponent';
import ConsoleComponent from './console/ConsoleComponent';
import SystemComponent from './system/SystemComponent';
import MenuComponent from './menu/MenuComponent';

export default class App extends Component {
	render() {
		return (<oksee className="flex-row flex-gutter">
			<GridComponent className="flex-full" />
			<SystemComponent>
				<FlagComponent />
				<MenuComponent>ha!</MenuComponent>
				<ConsoleComponent />
			</SystemComponent>
		</oksee>);
	}
}
