import './menu.scss';

import React, {Component} from 'react';

// CONVENIENCE HACK, THE APP SHOULD BE RECEIVED THROUGH PROPS
import app from '../command/main-app';

export default class MenuItemComponent extends Component {
	handleClick (event) {
		app.submit(this.props.input);
	}

	render() {
		return (<oksee-menu-item
				class="flex-row flex-gutter"
				data-command={this.props.input}
			>
			{this.props.input}
		</oksee-menu-item>);
	}
}
