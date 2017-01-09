import React, {Component} from 'react';

export default class LogErrorComponent extends Component {
	render() {
		return (<oksee-log-error>
			{this.props.children}
		</oksee-log-error>);
	}
}
