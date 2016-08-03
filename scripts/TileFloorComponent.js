import React, {Component} from 'react';

import perspective from './perspective';
import Renderer from './Renderer';
import Color from 'color-js';

export default class TileFloorComponent extends Component {
	constructor () {
		super();
		this.state = {
			width: 0,
			height: 0
		}
	}
	renderCanvas (renderer) {
		renderer
			.setStrokeWidth(0.5)
			.strokeBoxHalo (
				0.1,
				0.1,
				-1.2,
				0.8,
				0.8,
				0.8,
				Color('black'),
				Color('rgba(255,255,255,0.8)'),
				0
			);
	}
	componentDidMount () {
		let bb = this.refs.canvas.parentNode.getBoundingClientRect();

		this.renderer = new Renderer(perspective, this.refs.canvas);

		this.setState({
			width: perspective.toPixels(1, 1, 0)[0],
			height: perspective.toPixels(0, 0, -1)[1] + perspective.toPixels(1, 0, 0)[1] + 3
		});
	}
	componentDidUpdate () {
		this.renderer.clear();
		this.renderCanvas(this.renderer);
	}
	render() {
		return (<canvas
			ref='canvas'
			width={this.state.width}
			height={this.state.height}
		/>);
	}
}
