import './console.scss';

import React, {Component} from 'react';
import Console from './Console';
import ConsoleInputComponent from './ConsoleInputComponent';
import ConsoleOutputComponent from './ConsoleOutputComponent';
import LogHelper from '../log/LogHelper';

export default class ConsoleComponent extends Component {
	constructor () {
		super();

		this.outputDestroyer = null;

		this.console = new Console();
		this.logger= new LogHelper(this.console);

		this.state = {
			input: '',
			output: []
		}
	}
	render() {
		return (<oksee-console>
			{this.props.children}
			<ConsoleOutputComponent
				console={this.console}
				logger={this.logger}
			/>
			<ConsoleInputComponent
				console={this.console}
				logger={this.logger}
			/>
		</oksee-console>);
	}
}
