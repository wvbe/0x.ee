import './console.scss';

import React, {Component} from 'react';
import Console from './Console';
import ConsoleInputComponent from './ConsoleInputComponent';
import ConsoleOutputComponent from './ConsoleOutputComponent';

export default class ConsoleComponent extends Component {
	constructor () {
		super();

		this.outputDestroyer = null;

		this.app = new Console();

		this.state = {
			input: '',
			output: []
		}
	}
	render() {
		return (<oksee-console>
			{this.props.children}
			<ConsoleOutputComponent console={this.app} />
			<ConsoleInputComponent console={this.app} />
		</oksee-console>);
	}
}
