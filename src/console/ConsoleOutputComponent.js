import React, {Component} from 'react';
import * as styles from '../styles';
import ConsoleLogComponent from './ConsoleLogComponent';

const style = styles.merge(
	styles.display.block);
// The list of all logs, errors, etc.
export default class ConsoleOutputComponent extends Component {
	constructor () {
		super();

		//props.logger
		//props.maxHistory
		this.state = {
			historyStart: 0,
			historyEnd: 0
		};

		this.history = [];
		this.historyIndex = 0;
		this.internalQueue = [];
		this.internalTimeout = null;
	}

	slobberNewOutput (out) {
		if(out)
			this.internalQueue.push({
				index: ++this.historyIndex,
				component: out
			});

		if(this.internalTimeout)
			return;

		let updateHistory = function () {
			if(!this.internalQueue.length) {
				clearTimeout(this.internalTimeout);
				this.internalTimeout = null;
				return;
			}

			this.history.push(this.internalQueue.shift());

			// Replace history, trim if necessary
			this.setState({
				historyStart: Math.max(0, this.history.length - this.props.maxHistory),
				historyEnd: this.history.length
			});

			this.internalTimeout = setTimeout(updateHistory, 25);
		}.bind(this);

		this.internalTimeout = setTimeout(updateHistory, 25);
	}

	// shouldComponentUpdate (nextProps, nextState) {
	// 	return !!this.internalQueue.length;
	// }

	componentDidMount () {
		// When logger is called from anywhere, do:
		this.outputDestroyer = this.props.logger.onOutput(this.slobberNewOutput.bind(this));
	}

	componentWillUnmount () {
		// Stop listening to logger calls
		this.outputDestroyer();
	}

	render() {
		return (<oksee-console-output
			{ ...style }
			{ ...styles.merge({
				maxHeight: this.props.maxHeight ? this.props.maxHeight + 'em' : 'auto',
				overflow: this.props.overflow ? 'auto' : 'hidden'
			}) }
			class="fuck-you-scroll">
			{this.history.slice(this.state.historyStart, this.state.historyEnd).map(log => <ConsoleLogComponent key={log.index}>{log.component}</ConsoleLogComponent>)}
		</oksee-console-output>);
	}
}
