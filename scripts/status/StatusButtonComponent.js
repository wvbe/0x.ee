import './status-button.scss';

import React, {Component} from 'react';

export default class StatusButtonComponent extends Component {
	constructor () {
		super();
		this.state = {
			enabled: true
		};

		this.switchState = function () {
			this.props.logger.log(
				`Toggle ${this.props.name}: ${!this.state.enabled}`,
				`Status`);
			this.setState({
				enabled: !this.state.enabled
			});
		}.bind(this);
	}

	render() {
		let statusString = this.state.enabled ? 'enabled' : 'disabled';
		return (<oksee-status-button class="flex-row flex-gutter" onClick={this.switchState}>
			<div className="oksee-status-button__checkbox" data-checkbox-state={statusString}></div>
			<div className="flex-column">
				<div className="oksee-status-button__name">{this.props.name}</div>
				<div className="oksee-status-button__status">{statusString}</div>
			</div>
		</oksee-status-button>);
	}
}
