import './menu.scss';

import React, {Component} from 'react';

export default class MenuItemComponent extends Component {
	render() {
		return (<oksee-menu-item class="flex-row flex-gutter">
			{this.props.input}
		</oksee-menu-item>);
	}
}
