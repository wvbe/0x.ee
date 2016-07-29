import './console-log.scss';

import React, {Component} from 'react';

let allLogKeys = 0;

// The wrapper for one unit in the console output history
export default class LogErrorComponent extends Component {
	constructor () {
		super();
		this.log = {
			time: new Date(),
			key: ++allLogKeys
		}
	}

	render() {
		return (<oksee-console-log key={this.log.key}>{this.props.children}</oksee-console-log>);
	}
}
