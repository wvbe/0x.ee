import './draggable.scss';

import React, {Component} from 'react';
import PropertiesComponent from '../components/PropertiesComponent';

function stopDrag (component, e) {
	component.lastDragStart = null;

	window.removeEventListener('mouseup', component.onDragStop);
	window.removeEventListener('mousemove', component.onDragMove);

	component.refs.draggable.addEventListener('mousedown', component.onDragStart);

	component.setState({
		ghost: false
	});
	e.preventDefault();
}
function getStyleForDelta(delta) {
	return {
		width: Math.sqrt(delta.x*delta.x + delta.y*delta.y),
		transform: Math.atan2(delta.y, delta.x)// + (delta.y > 0 ? 2 * Math.PI : 0)
	}
}
export default class DraggableComponent extends Component {
	constructor () {
		super();

		this.state = {
			ghost: false,
			x: 0,
			y: 0
		};

		this.lastDragStart = null;

		this.onDragStart = (e) => {
			if(e.which !== 1) {
				return;
			}

			let bb = this.refs.draggable.getBoundingClientRect();

			this.lastDragStart = {
				x: e.clientX,
				y: e.clientY,
				width: bb.width,
				height: bb.height,
				left: bb.left,
				top: bb.top
			};

			this.setState({
				ghost: {
					width: (bb.width + 10) + 'px',
					height: (bb.height + 10) + 'px',
					top: bb.top - 5,
					left: bb.left - 5
				}
			});

			this.refs.draggable.removeEventListener('mousedown', this.onDragStart);


			window.addEventListener('mouseup', this.onDragStop);
			window.addEventListener('mousemove', this.onDragMove);

			e.preventDefault();
		};

		this.onDragMove = (e) => {
			let dx = e.clientX - this.lastDragStart.x,
				dy = e.clientY - this.lastDragStart.y;

			if(this.angleCanvas) {
				let ctx = this.angleCanvas.getContext("2d"),
					transform = getStyleForDelta({ x: dx, y: dy });
				console.log(transform);
				ctx.clearRect(0, 0, 36, 36);
				ctx.beginPath();
				ctx.arc(
					18,
					18,
					16,
					0,
					transform.transform,
					true
				);
				ctx.strokeStyle = '#2c2c2c';
				ctx.stroke();
			}

			this.setState({
				x: this.lastDragStart.left + dx,
				y: this.lastDragStart.top + dy
			});

			e.preventDefault();
		};

		this.onDragStop = (e) => {
			stopDrag(this, e);
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
			left: this.state.x
		};

		let ghost = null;

		if(this.state.ghost) {
			let delta = {
					x:this.state.x - this.lastDragStart.left,
					y: this.state.y - this.lastDragStart.top
				},
				transform = getStyleForDelta(delta),
				dickStyle = {
					width: `${transform.width}px`,
					transform: `rotate(${transform.transform}rad)`
				},
				dicks = {
					'position': `${this.state.x}, ${this.state.y}`,
					'delta': `${delta.x}, ${delta.y}`,
					'size': `${this.lastDragStart.width} x ${this.lastDragStart.height}`,
					'vector': `${Math.round(transform.width * 100) / 100}, ${transform.transform}rad`
				};
			ghost = (<oksee-draggable-ghost style={this.state.ghost}>
				<hr style={dickStyle}/>
				<hr style={dickStyle}/>
				<hr style={dickStyle}/>
				<hr style={dickStyle}/>
				<canvas width="36" height="36" ref={(c) => this.angleCanvas = c }/>
				<PropertiesComponent {...dicks} />
			</oksee-draggable-ghost>);
		}

		return (<oksee-draggable-wrapper>
			{ghost}
			<oksee-draggable
				ref='draggable'
				style={style}
				onMouseDown={this.onDragStart}
			>{this.props.children}</oksee-draggable>
		</oksee-draggable-wrapper>);
	}
}
