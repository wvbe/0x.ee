import './window.scss';

import React, {Component} from 'react';
import MenuItemComponent from '../menu/MenuItemComponent';

export default class WindowComponent extends Component {
	constructor () {
		super();
	}

	handleClose () {
		return new Promise(res => setTimeout(res, 1000)).then(() => {
			console.log('CLOSE WINDOW');
		});
	}

	render() {
		return (<oksee-window class="flex-column">
			<oksee-window-header class="flex-fixed flex-row flex-gutter flex-space-between">
				<div className="flex-fluid">{this.props.name}</div>
				<div className="flex-fixed flex-row">
					<MenuItemComponent onClick={this.handleClose}>btn</MenuItemComponent>
					<MenuItemComponent onClick={() => console.log('NNN')}>btn</MenuItemComponent>
				</div>
			</oksee-window-header>
			<oksee-window-content class="flex-fluid">{this.props.children}</oksee-window-content>
		</oksee-window>);
	}
}
