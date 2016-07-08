import './menu.scss';

import React, {Component} from 'react';

export default class MenuComponent extends Component {
	render() {
		return (<oksee-menu class="flex-row flex-gutter">
			{this.props.children}
		</oksee-menu>);
	}
}
