import './style.scss';

import React, {Component} from 'react';

import TileComponent from './flag/TileComponent';

function updateSizeForElement(element) {
	var bb = element.getBoundingClientRect(),
		size = {
			x: parseInt(bb.width),
			y: parseInt(bb.height)
		},
		changed = size.x !== this.size.x || size.y !== this.size.y;

	this.size = size;

	if(changed)
		this.emit('resize', this);

	return this;
}

function createPerspective (degrees, tileSize) {

	let size = {
		x: 800,
		y: 600
	};

	let offset = {
		x: 0,
		y: 0
	};

	let isometricAngle = degrees * (Math.PI / 180);
	let _isometricCos = Math.cos(isometricAngle);
	let _isometricSin = Math.sin(isometricAngle);
	let _isometricTan = Math.tan(isometricAngle);
	let _isometricDist = Math.sqrt(Math.pow(_isometricCos, 2) + Math.pow(_isometricSin, 2)); // pythagoras

	let tileHeight = tileSize/6;

	return {
		toPixels: (x, y, z, omitOffset) => {
			var cartX = (x + y) * _isometricCos,
				cartY = (x - y) * _isometricSin;

			return [
				(omitOffset ? 0 : offset.x + 0.5 * size.x)  + cartX * tileSize, // x
				(omitOffset ? 0 : offset.y + 0.5 * size.y) + cartY * tileSize - tileHeight * z // y
			];
		},
		toCoords: (cartX, cartY, omitOffset) => {
			// assuming y = ax + b
			cartX = cartX  - 0.5 * size.x  - (omitOffset ? 0 : offset.x);
			cartY = -cartY + 0.5 * size.y + (omitOffset ? 0 : offset.y);

			var isoY = (_isometricTan * cartX + cartY),
				isoX = (cartY - isoY) / -_isometricSin - isoY;

			// this is good so far, b should be rescaled for tile size. as
			return [
				isoX / tileSize,
				isoY / tileSize
			];
		}
	}
}

export default class RootComponent extends Component {
	constructor () {
		super();

		this.perspective = createPerspective(30, 30);
	}

	render() {
		return (
			<div className='luggage'>
				<div className='luggage-world'>
					<TileComponent perspective={this.perspective} x='0' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='1' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='2' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='3' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='1' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='2' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='3' z='0'/>
					<TileComponent perspective={this.perspective} x='-1' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='-2' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='-3' y='0' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='-1' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='-2' z='0'/>
					<TileComponent perspective={this.perspective} x='0' y='-3' z='0'/>
				</div>
			</div>
		);
	}
}
