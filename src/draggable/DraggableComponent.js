import React, {Component} from 'react';

import * as styles from '../styles';

const wrapperStyle = styles.merge(styles.position.relative);
const ghostBaseStyle = styles.merge(
	styles.display.block,
	styles.position.absolute,
	styles.border.subtle,
	styles.theme.dim,
	{
		boxSizing: 'border-box',
		padding: styles.length.line
	});
const ghostCanvasStyle = styles.merge(
	styles.position.absolute,
	{
		top: 0,
		left: 0,
		transform: 'translate(-50%, -50%)'
	});

const ghostLineStyle = Object.assign({}, styles.position.absolute,
	{
		transformOrigin: 'top left',
		borderTop: '1px dotted ' + styles.palette.fg.toString()
	});


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
		connectingLineStyle = Object.assign(
			{},
			ghostLineStyle,
			{
				width: `${connectingLineTransformation.width}px`,
				transform: `rotate(${connectingLineTransformation.transform}rad)`
			}),
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



	const ghostStyle = styles.merge(
		ghostBaseStyle,
		state.ghost);
	return (<oksee-draggable-ghost { ...ghostStyle }>
		{ [
			{ top: 0, left: 0 },
			{ top: '100%', left: 0 },
			{ top: '100%', left: '100%' },
			{ top: 0, left: '100%' }
		].map((offset, i) => {
			const style = styles.merge(connectingLineStyle, offset);
			return <hr key={ i } { ...style } />
		}) }

		<canvas { ...ghostCanvasStyle} width="36" height="36" ref={(c) => component.angleCanvas = c }/>

		<pre>{ JSON.stringify(connectingLineInfo, null, '  ') } </pre>
	</oksee-draggable-ghost>);
}

function getSquareForSizeAndRatio (zoomFactor, ratioLandscapeness) {
	const screenSides = [window.innerWidth, window.innerHeight];
	const screenLandscapeness = screenSides[0]/screenSides[1];
	const ratioSides = [1, 1 / ratioLandscapeness]; // ratio = 0/1 landscape > 1 > portrait
	// ratioLandscapeness = ratioSides[0] / ratioSides[1];

	// 1:1 <
	return (screenLandscapeness < ratioLandscapeness ?
		[
			// if the screen is more landscape than the picture, the picture touches the top and bottom of the space
			screenSides[0],
			screenSides[1] / (ratioLandscapeness / (screenLandscapeness))
		] :
		[
			screenSides[0] * (ratioLandscapeness / (screenLandscapeness)),
			screenSides[1]
		]).map(length => Math.round(length * zoomFactor));
}

function getCoordinatesForCenteredPicture (sizes) {
	const screenSides = [window.innerWidth, window.innerHeight];

	return sizes.map((size, i) => Math.round(screenSides[i] - size)/2);
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
				ctx.strokeStyle = styles.palette.fg.toString();
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

	componentWillMount () {
		const size = getSquareForSizeAndRatio(this.props.size || 0.8, this.props.ratio || 16/9);
		const offset = getCoordinatesForCenteredPicture(size);
		this.state = {
			w: size[0],
			h: size[1],
			x: offset[0],
			y: offset[1]
		};
	};

	componentDidMount () {
		this.refs.draggable.addEventListener('mousedown', this.onDragStart);
	}

	componentWillUnmount () {
		this.refs.draggable.removeEventListener('mousedown', this.onDragStart);
		window.removeEventListener('mouseup', this.onDragStop);
		window.removeEventListener('mousemove', this.onDragMove);
	}

	render() {
		const draggableStyle = styles.merge(
			styles.flex.vertical,
			styles.position.absolute,
			{
				width: this.state.w,
				height: this.state.h,
				top: this.state.y,
				left: this.state.x,
			});


		return (<oksee-draggable-wrapper { ...wrapperStyle }>
			{this.state.ghost ? getGhostElement(this) : null}
			<oksee-draggable
				ref='draggable'
				{ ...draggableStyle }
				onMouseDown={this.onDragStart}
			>{this.props.children}</oksee-draggable>
		</oksee-draggable-wrapper>);
	}
}
