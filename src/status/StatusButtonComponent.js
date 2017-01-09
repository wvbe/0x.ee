import api from '../api';
import React, {Component} from 'react';

export default class StatusButtonComponent extends Component {
	constructor () {
		super();

		this.switchState = function () {
			api.secondaryLogger.log(
				`Toggle ${this.props.name}: ${!this.props.enabled}`,
				`Status`);

			this.props.toggle(this.props.enabled)
		}.bind(this);
	}

	render() {
		let statusString = this.props.enabled ? 'enabled' : 'disabled';
		return (<oksee-status-button class="flex-row flex-gutter flex-items-center" onClick={this.switchState}>
			<div
				className="oksee-status-button__widget"
				data-checkbox-state={statusString}
			></div>
			<div className="flex-column">
				<div className="oksee-status-button__name">{this.props.name}</div>
				<div className="oksee-status-button__status">{statusString}</div>
			</div>
		</oksee-status-button>);
	}
}
