import './console.scss';

import React, {Component} from 'react';
import ConsoleInputComponent from './ConsoleInputComponent';
import ConsoleOutputComponent from './ConsoleOutputComponent';

export default class ConsoleComponent extends Component {
	render() {
		return (<oksee-console>
			{this.props.children}
			<ConsoleInputComponent />
		</oksee-console>);
	}
}
