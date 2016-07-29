import './console-output.scss';

import React, {Component} from 'react';
import ConsoleLogComponent from './ConsoleLogComponent';

// The list of all logs, errors, etc.
export default class ConsoleOutputComponent extends Component {
	constructor () {
		super();

		//props.logger
		//props.maxHistory
		this.state = {
			history: []
		}
	}
	componentDidMount () {
		// When logger is called from anywhere, do:
		this.outputDestroyer = this.props.logger.onOutput(component => {
			let history = this.state.history;
			history.push(component);

			// Replace history, trim if necessary
			this.setState({
				history: this.props.maxHistory && history.length > this.props.maxHistory
					? history.slice(history.length - this.props.maxHistory)
					: history
			})
		});
	}

	componentWillUnmount () {
		// Stop listening to logger calls
		this.outputDestroyer();
	}

	render() {
		return (<oksee-console-output>
			{this.state.history.map((log, i) => <ConsoleLogComponent key={i}>{log}</ConsoleLogComponent>)}
		</oksee-console-output>);
	}
}
