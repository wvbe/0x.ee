import './window.scss';

import React, {Component} from 'react';
import api from '../api';
import WindowComponent from './WindowComponent';
import DraggableComponent from '../draggable/DraggableComponent';
var windowIndex = 0;

export default class WindowContainerComponent extends Component {
	constructor () {
		super();

		this.onComponentWillUnmount = [];

		this.state = {
			windows: []
		};
	}

	componentDidMount () {
		this.onComponentWillUnmount.push(api.on('window:new', (name, content) => {
			if(this.state.windows.find(win => win.name === name)) {
				api.secondaryLogger.log('Already exists: ' + name, 'window');
				return;
			}

			api.secondaryLogger.log('New: ' + name, 'window');
			let key = ++windowIndex;
			this.setState({
				windows: [
					...this.state.windows,
					{
						name,
						content: (<DraggableComponent key={key}>
							<WindowComponent name={name}>{content}</WindowComponent>
						</DraggableComponent>)
					}
				]
			});
		}));

		this.onComponentWillUnmount.push(api.on('window:destroy', (name) => {
			api.secondaryLogger.log('Destroy: ' + name, 'window');
			this.setState({
				windows: this.state.windows.filter(win => win.name !== name)
			});
		}));
	}


	componentWillUnmount () {
		this.onComponentWillUnmount.forEach(cb => cb());

		window.removeEventListener('hashchange', submitFromHash);
		window.removeEventListener('click', submitFromClick);
	}

	render() {
		return (
			<oksee-window-container>
				{this.state.windows.map(win => win.content)}
			</oksee-window-container>);
	}
}
