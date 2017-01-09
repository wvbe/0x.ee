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

function getTransformationForDelta(delta) {
	return {
		width: Math.sqrt(delta.x*delta.x + delta.y*delta.y),
		transform: Math.atan2(delta.y, delta.x)
	}
}

function getGhostElement (component) {
	let state = component.state,
		lastDragStart = component.lastDragStart;

	let delta = {
			x:state.x - lastDragStart.left,
			y: state.y - lastDragStart.top
		},
		connectingLineTransformation = getTransformationForDelta(delta),
		connectingLineStyle = {
			width: `${connectingLineTransformation.width}px`,
			transform: `rotate(${connectingLineTransformation.transform}rad)`
		},
		connectingLineInfo = {
			'position': [
				state.x,
				state.y
			].join(', '),
			'delta': [
				delta.x,
				delta.y
			].join(', '),
			'size': [
				lastDragStart.width,
				lastDragStart.height
			].join(' x '),
			'vector': [
				Math.round(connectingLineTransformation.width * 1000) / 1000,
				(Math.round(connectingLineTransformation.transform * 1000) / 1000) + 'rad'
			].join(', ')
		};

	return (<oksee-draggable-ghost style={state.ghost}>
		<hr style={connectingLineStyle}/>
		<hr style={connectingLineStyle}/>
		<hr style={connectingLineStyle}/>
		<hr style={connectingLineStyle}/>
		<canvas width="36" height="36" ref={(c) => component.angleCanvas = c }/>
		<PropertiesComponent {...connectingLineInfo} />
	</oksee-draggable-ghost>);
}
export default class DraggableComponent extends Component {
	constructor () {
		super();

		this.state = {
			ghost: false,
			x: 0,
			y: 0
		};

		this.angleCanvas = null;

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
					transform = getTransformationForDelta({ x: dx, y: dy });

				ctx.clearRect(0, 0, 36, 36);
				ctx.beginPath();
				ctx.arc(18, 18, 16, 0, transform.transform, true);
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
		return (<oksee-draggable-wrapper>
			{this.state.ghost ? getGhostElement(this) : null}
			<oksee-draggable
				ref='draggable'
				style={{
					top: this.state.y,
					left: this.state.x
				}}
				onMouseDown={this.onDragStart}
			>{this.props.children}</oksee-draggable>
		</oksee-draggable-wrapper>);
	}
}
