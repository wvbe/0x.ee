import React, {Component} from 'react';
import * as styles from '../styles';
import api from '../api';
import WindowComponent from './WindowComponent';
import DraggableComponent from '../draggable/DraggableComponent';
var windowIndex = 0;


const containerStyle = styles.merge(
	styles.position.fixed,
	{
		top: 0,
		left: 0
	});

export default class WindowContainerComponent extends Component {
	constructor () {
		super();

		this.onComponentWillUnmount = [];

		this.state = {
			windows: []
		};
	}

	componentDidMount () {
		this.onComponentWillUnmount.push(api.on('window:new', (name, content, options) => {
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
						content: (<DraggableComponent key={key} { ...options }>
							<WindowComponent name={name} options={ options }>{content}</WindowComponent>
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

	render() {
		return (
			<oksee-window-container { ...containerStyle }>
				{this.state.windows.map(win => win.content)}
			</oksee-window-container>);
	}
}
