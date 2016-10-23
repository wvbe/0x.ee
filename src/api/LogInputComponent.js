import './log.scss';

import React, {Component} from 'react';

function getClockTime (date) {
	date = date || new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export default class LogInputComponent extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return false;
	}

	render() {
		return (<oksee-log-message class='flex-row flex-gutter' data-connotation={this.props.connotation || 'log'}>
			<oksee-log-prefix class="flex-row flex-items-start">
				<div className="content">{this.props.prefix}</div>
				<div className="alt-content">{getClockTime(this.props.time)}</div>
				<div className="arrow" />
			</oksee-log-prefix>
			<oksee-log-content>{this.props.children}</oksee-log-content>
		</oksee-log-message>);
	}
}
