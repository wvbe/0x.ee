import './console-log.scss';

import React, {Component} from 'react';

let allLogKeys = 0;

export default class LogErrorComponent extends Component {
	constructor () {
		super();
		this.key = ++allLogKeys;

		console.log('Construct', this.key);
	}
	render() {
		return (<oksee-console-log key={this.key}>
			{this.props.children}
		</oksee-console-log>);
	}
}
