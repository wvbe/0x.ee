import React, {Component} from 'react';
import api from '../api';
import * as styles from '../styles';

const style = styles.merge(
	styles.display.inlineBlock,
	styles.connotation.interactive,
	styles.padding.button,
	styles.theme.inverse,
	{
		':hover': styles.theme.inverseFocused
	});
const busyStyle = styles.merge({
	textDecoration: 'line-through'
});
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
		if(!this.props.onClick && !this.props.input)
			return;

		event.preventDefault();

		if(this.props.input)
			return api.submit(this.props.input);

		// @NOTE: intentionally not taking uncaught errors into account
		return Promise.resolve(this.props.onClick(event));
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

		this.setBusy(!!api.busyReasons.length);

		this.onComponentWillUnmount.push(api.on('busy', busyReasons => this.setBusy(busyReasons.length)));
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
			className={ className }
			{ ...style }
			{ ...(this.state.busy && busyStyle) }
				onClick={this.handleClick.bind(this)}
			>
			{this.props.children || this.props.input}
		</oksee-menu-item>);
	}
}
