import './window.scss';

import React, {Component} from 'react';
import app from '../command/main-app';
import MenuItemComponent from '../menu/MenuItemComponent';

export default class WindowComponent extends Component {
	constructor () {
		super();

		this.close = () => {
			app.emit('window:destroy', this.props.name);
		}
	}

	render() {
		return (<oksee-window class="flex-column">
			<oksee-window-header class="flex-fixed flex-row flex-gutter flex-space-between">
				<div className="flex-fluid">{this.props.name}</div>
				<div className="flex-fixed flex-row">
					<MenuItemComponent onClick={this.close.bind(this)}>x</MenuItemComponent>
				</div>
			</oksee-window-header>
			<oksee-window-content class="flex-fluid">{this.props.children}</oksee-window-content>
		</oksee-window>);
	}
}
