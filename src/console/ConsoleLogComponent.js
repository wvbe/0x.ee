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
		this.element = null;
	}

	componentDidMount () {
		// When the entry is logged, scroll the containing ConsoleOutputComponent to its bottom.
		// This is a dirty hack, and it assumes the container is el.parentNode.parentNode
		// But it works, for now
		if (!this.element) {
			return;
		}

		this.element.parentNode.scrollTop = this.element.parentNode.scrollHeight;
	}

	componentWillUnmount () {

	}

	shouldComponentUpdate (nextProps, nextState) {
		return false;
	}

	render() {
		return (<oksee-console-log
			ref={(input) => { this.element = input; }}
			key={this.log.key}
		>
			{this.props.children}
		</oksee-console-log>);
	}
}
