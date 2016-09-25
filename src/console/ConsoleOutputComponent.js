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
		};

		this.internalQueue = [];
		this.internalTimeout = null;
	}

	slobberNewOutput (out) {
		if(out)
			this.internalQueue.push(out);

		if(this.internalTimeout)
			return;

		let updateHistory = function () {
			if(!this.internalQueue.length) {
				clearTimeout(this.internalTimeout);
				this.internalTimeout = null;
				return;
			}

			let history = this.state.history;

			history.push(this.internalQueue.shift());

			// Replace history, trim if necessary
			this.setState({
				history: this.props.maxHistory && history.length > this.props.maxHistory
					? history.slice(history.length - this.props.maxHistory)
					: history
			});

			this.internalTimeout = setTimeout(updateHistory, 25);
		}.bind(this);

		this.internalTimeout = setTimeout(updateHistory, 25);
	}
	shouldComponentUpdate (nextProps, nextState) {
		return !!this.internalQueue.length;
	}

	componentDidMount () {
		// When logger is called from anywhere, do:
		this.outputDestroyer = this.props.logger.onOutput(this.slobberNewOutput.bind(this));
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
