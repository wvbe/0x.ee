import './console.scss';

import React, {Component} from 'react';
import ConsoleInputComponent from './ConsoleInputComponent';
import ConsoleOutputComponent from './ConsoleOutputComponent';

export default class ConsoleComponent extends Component {
	constructor () {
		super();

		this.outputDestroyer = null;

		this.state = {
			input: '',
			output: []
		}
	}
	render() {
		return (<oksee-console>
			<ConsoleOutputComponent
				{...this.props}
			/>
			<ConsoleInputComponent
				{...this.props}
			/>
		</oksee-console>);
	}
}
