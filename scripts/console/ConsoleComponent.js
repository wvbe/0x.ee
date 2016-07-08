import './console.scss';

import React, {Component} from 'react';

export default class ConsoleComponent extends Component {
	render() {
		return (<oksee-console>
			{this.props.children}
		</oksee-console>);
	}
}
