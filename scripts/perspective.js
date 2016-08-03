'use strict';

function createPerspective (degrees, tileSize) {
	let isometricAngle = degrees * (Math.PI / 180);
	let _isometricCos = Math.cos(isometricAngle);
	let _isometricSin = Math.sin(isometricAngle);
	let _isometricTan = Math.tan(isometricAngle);
	let _isometricDist = Math.sqrt(Math.pow(_isometricCos, 2) + Math.pow(_isometricSin, 2)); // pythagoras

	let tileHeight = tileSize;

	return {
		tileSize: tileSize,
		toPixels: (x, y, z, omitOffset) => {
			var cartX = (x + y) * _isometricCos,
				cartY = (x - y) * _isometricSin;

			return [
				cartX * tileSize, // x
				cartY * tileSize - tileHeight * z // y
			];
		},
		toCoords: (cartX, cartY, omitOffset) => {

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

module.exports = createPerspective(30, 30);