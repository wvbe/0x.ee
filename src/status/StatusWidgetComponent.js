import api from '../api';
import React, {Component} from 'react';

export default class StatusButtonComponent extends Component {
	constructor () {
		super();
	}

	render() {
		return (<oksee-status-widget class="flex-row flex-gutter flex-items-center">
			<div className="oksee-status-button__widget" style={{ fontSize: '2em' }}>
				{this.props.children}
			</div>
			<div className="flex-column">
				<div className="oksee-status-button__name">{this.props.name}</div>
				<div className="oksee-status-button__status">{this.props.status}</div>
			</div>
		</oksee-status-widget>);
	}
}
