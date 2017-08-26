import React, {Component} from 'react';
import api from '../api';
import MenuItemComponent from '../menu/MenuItemComponent';
import ToastComponent from '../toast/ToastComponent';

import * as styles from '../styles';

const windowStyle = styles.merge(
	styles.flex.fluid,
	styles.flex.vertical,
	styles.border.subtle,
	styles.border.strong,
	styles.theme.normal,
	{
		padding: 1
	});
const rowStyle = styles.merge(
	styles.flex.horizontal);

const contentStyle = styles.merge(
	styles.flex.vertical,
	styles.flex.fluid,
	styles.overflow.auto);

const headerStyles = styles.merge(
	styles.flex.fixed,
	styles.flex.horizontal,
	styles.flex.spaceBetween,
	styles.flex.gutter,
	styles.steno.normal);

const headerNameStyles = styles.merge(
	styles.flex.fluid,
	styles.theme.inverse,
	styles.padding.field,
	styles.padding.button);
export default class WindowComponent extends Component {
	constructor () {
		super();
		this.state = {
			ready: false
		};
		this.close = () => {
			api.emit('window:destroy', this.props.name);
		}
	}

	componentDidMount () {
		setTimeout(() => this.setState({
			ready: true
		}), 1000);
	}
	render() {
		let toast = this.state.ready
			? null
			: <ToastComponent message="Loading window..."/>;
		return (<oksee-window { ...windowStyle }>
			<oksee-window-header { ...headerStyles } { ...rowStyle }>
				<div { ...headerNameStyles }>{this.props.name}</div>
				<div { ...styles.merge(styles.flex.fixed) } { ...rowStyle }>
					<MenuItemComponent onClick={this.close.bind(this)}>&times;</MenuItemComponent>
				</div>
			</oksee-window-header>
			<oksee-window-content { ...contentStyle } class="fuck-you-scroll">
				{toast ? toast : null}
				{!toast ? this.props.children : null }
			</oksee-window-content>
		</oksee-window>);
	}
}
