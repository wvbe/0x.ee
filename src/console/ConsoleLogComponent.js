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

	componentDidMount () {
		// When the entry is logged, scroll the containing ConsoleOutputComponent to its bottom.
		// This is a dirty hack, and it assumes the container is el.parentNode.parentNode
		// But it works, for now
		let scrollContainer = this.refs.el.parentNode.parentNode;
		scrollContainer.scrollTop = scrollContainer.scrollHeight;
	}

	render() {
		return (<oksee-console-log ref='el' key={this.log.key}>{this.props.children}</oksee-console-log>);
	}
}
