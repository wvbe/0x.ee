import './draggable.scss';

import React, {Component} from 'react';

export default class DraggableComponent extends Component {
	constructor () {
		super();

		this.state = {
			x: 0,
			y: 0
		};

		this.lastDragStart = null;

		this.onDragStart = (e) => {
			let bb = this.refs.draggable.getBoundingClientRect();

			this.lastDragStart = {
				x: e.clientX,
				y: e.clientY,
				left: bb.left,
				top: bb.top
			};

			this.refs.draggable.removeEventListener('mousedown', this.onDragStart);

			window.addEventListener('mouseup', this.onDragStop);
			window.addEventListener('mousemove', this.onDragMove);

			e.preventDefault();
		};

		this.onDragMove = (e) => {
			let dx = e.clientX - this.lastDragStart.x,
				dy = e.clientY - this.lastDragStart.y;

			this.setState({
				x: this.lastDragStart.left + dx,
				y: this.lastDragStart.top + dy
			});

			e.preventDefault();
		};

		this.onDragStop = (e) => {
			this.lastDragStart = null;

			window.removeEventListener('mouseup', this.onDragStop);
			window.removeEventListener('mousemove', this.onDragMove);

			this.refs.draggable.addEventListener('mousedown', this.onDragStart);

			e.preventDefault();
		};
	}

	componentDidMount () {
		this.refs.draggable.addEventListener('mousedown', this.onDragStart);
	}

	componentWillUnmount () {
		this.refs.draggable.removeEventListener('mousedown', this.onDragStart);
		window.removeEventListener('mouseup', this.onDragStop);
		window.removeEventListener('mousemove', this.onDragMove);
	}

	render() {
		let style = {
			top: this.state.y,
			left: this.state.x,
			position: 'absolute'
		};
		return (<oksee-draggable
			ref='draggable'
			style={style}
			onMouseDown={this.onDragStart}
		>{this.props.children}</oksee-draggable>);
	}
}
