import React, {Component} from 'react';

export default class TileComponent extends Component {
	render() {
		let pixels = this.props.perspective.toPixels(
				parseInt(this.props.x),
				parseInt(this.props.y),
				parseInt(this.props.z)
			),
			styleAttr = {
				left: pixels[0] + 'px',
				top: pixels[1] + 'px'
			};

		console.log(pixels, styleAttr);

		return (<div
			className='luggage-tile'
			style={styleAttr}
		>({[this.props.x, this.props.y, this.props.z].join(', ')})</div>);
	}
}
