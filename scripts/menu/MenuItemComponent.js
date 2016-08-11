import './menu.scss';

import React, {Component} from 'react';
import app from '../command/main-app';


export default class MenuItemComponent extends Component {
	constructor () {
		super();

		this.onComponentWillUnmount = [];

		this.state = {
			busy: false
		};
	}

	/**
	 * Submits to console, or executes callback and syncs busy state on the (optional) Promise
	 * @param event
	 * @returns {*}
	 */
	handleClick (event) {
		if(this.props.input)
			return app.submit(this.props.input);

		if(!this.props.onClick)
			return;

		this.setBusy(true);

		// @NOTE: intentionally not taking uncaught errors into account
		Promise.resolve(this.props.onClick(event))
			.then(v => {
				this.setBusy(false);
				return v;
			});
	}

	/**
	 * Debounces setting the state to unbusy
	 * @param busy
	 */
	setBusy (busy) {
		if(!!busy === !!this.state.busy)
			return;

		let minimumTimeToUnbusy = 100,
			nowSetToUnbusy = new Date().getTime();

		if(busy) {
			this.lastSetToBusy = new Date().getTime();
			clearTimeout(this.setToBusyTimeout);
		}

		if(!busy && nowSetToUnbusy - this.lastSetToBusy < minimumTimeToUnbusy) {
			this.setToBusyTimeout = setTimeout(
				() => this.setBusy(busy),
				minimumTimeToUnbusy + this.lastSetToBusy - nowSetToUnbusy);
			return;
		}

		this.setState({
			busy: !!busy
		});
	}
	componentWillMount () {
		if(!this.props.input)
			return;

		this.setBusy(!!app.busyReasons.length);

		this.onComponentWillUnmount.push(app.on('busy', busyReasons => this.setBusy(busyReasons.length)));
	}
	componentWillUnmount () {
		this.onComponentWillUnmount.forEach(cb => cb());
	}

	render() {
		let className = [
			'flex-row',
			'flex-gutter',
			'state-' + (this.state.busy ? 'busy' : 'unbusy')
		].join(' ');
		return (<oksee-menu-item
				class={className}
				onClick={this.handleClick.bind(this)}
			>
			{this.props.children || this.props.input}
		</oksee-menu-item>);
	}
}
