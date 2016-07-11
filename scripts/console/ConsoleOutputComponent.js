import './console-output.scss';

import React, {Component} from 'react';
import ConsoleLogComponent from './ConsoleLogComponent';

// The list of all logs, errors, etc.
export default class ConsoleOutputComponent extends Component {
	constructor () {
		super();
		this.state = {
			history: []
		}
	}
	componentDidMount () {
		this.outputDestroyer = this.props.console.onOutput(component => this.setState({
			history: this.state.history.concat([component])
		}));
	}
	componentWillUnmount () {
		this.outputDestroyer();
	}

	render() {
		return (<oksee-console-output>
			{this.state.history.map((log, i) => <ConsoleLogComponent key={i}>{log}</ConsoleLogComponent>)}
		</oksee-console-output>);
	}
}
