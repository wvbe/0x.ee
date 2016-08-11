import './window.scss';

import React, {Component} from 'react';

export default class WindowComponent extends Component {
	constructor () {
		super();
	}

	render() {
		let statusString = this.state.enabled ? 'enabled' : 'disabled';
		return (<oksee-window onClick={this.switchState}>
			<div className="oksee-status-button__checkbox" data-checkbox-state={statusString}></div>
			<div className="flex-column">
				<div className="oksee-status-button__name">{this.props.name}</div>
				<div className="oksee-status-button__status">{statusString}</div>
			</div>
		</oksee-window>);
	}
}
