import './console-output.scss';

import React, {Component} from 'react';

export default class ConsoleOutputComponent extends Component {
	render() {
		return (<oksee-console-output>
			{this.props.children}
		</oksee-console-output>);
	}
}
