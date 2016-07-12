import './log.scss';

import React, {Component} from 'react';

export default class LogInputComponent extends Component {
	render() {
		return (<oksee-log-message class='flex-row flex-gutter' data-connotation={this.props.connotation || 'log'}>
			<oksee-log-prefix class="flex-row flex-items-start">
				<div className="content">{this.props.time.getTime()}</div>
				<div className="arrow" />
			</oksee-log-prefix>
			<oksee-log-content>{this.props.children}</oksee-log-content>
		</oksee-log-message>);
	}
}
