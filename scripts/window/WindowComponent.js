import './window.scss';

import React, {Component} from 'react';
import app from '../command/main-app';
import MenuItemComponent from '../menu/MenuItemComponent';
import ToastComponent from '../toast/ToastComponent';

export default class WindowComponent extends Component {
	constructor () {
		super();
		this.state = {
			ready: false
		};
		this.close = () => {
			app.emit('window:destroy', this.props.name);
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
		return (<oksee-window class="flex-column">
			<oksee-window-header class="flex-fixed flex-row flex-gutter flex-space-between">
				<div className="flex-fluid">{this.props.name}</div>
				<div className="flex-fixed flex-row">
					<MenuItemComponent onClick={this.close.bind(this)}>&times;</MenuItemComponent>
				</div>
			</oksee-window-header>
			<oksee-window-content class="flex-fluid">
				{toast ? toast : null}
				<div style={{visibility: toast ? 'hidden' : 'visible'}}>{this.props.children}</div>
			</oksee-window-content>
		</oksee-window>);
	}
}
