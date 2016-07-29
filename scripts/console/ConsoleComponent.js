import './console.scss';

import React, {Component} from 'react';
import ConsoleInputComponent from './ConsoleInputComponent';
import ConsoleOutputComponent from './ConsoleOutputComponent';

export default class ConsoleComponent extends Component {
	constructor () {
		super();

		this.outputDestroyer = null;
	}

	componentDidMount () {
		let logger = this.props.logger;
		logger.log('0x.ee found, logging in as ANON');
		setTimeout(() => logger.log('Login OK, welcome honoured guest!'), 250);
		setTimeout(() => logger.log('---'), 500);
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
