import colorJs from 'color-js';

//export { style } from 'glamor';
export { merge } from 'glamor';

export const flex = {
	horizontal: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	},
	vertical: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'nowrap'
	},
	spaceBetween: {
		justifyContent: 'space-between'
	},
	fluid: {
		flex: '1 1 auto'
	},
	fixed: {
		flex: '0 0 auto'
	},
	gutter: {
		// @TODO
	}
};

export const display = {
	block: {
		display: 'block'
	}
};

export const position = {
	relative: {
		position: 'relative'
	}
};

const uiLength = 14;
export const length = {
	small: 0.5 * uiLength,
	line: 1 * uiLength,
	large: 4 * uiLength,
	gridItem: 8 * uiLength
};


export function color (input) {
	return colorJs(input);
};

const fg = color('#8e8e8e'),
	bg = color('#121212');

export const palette = {
	fg: fg,
	fgDim: fg.blend(bg, 0.5),

	bg: bg
};

export const steno = {
	normal: {
		fontFamily: 'Cousine',
		fontSize: 0.8 * uiLength
	},
	small: {
		fontFamily: 'Cousine',
		fontSize: 0.7 * uiLength,
		textTransform: 'uppercase',
		color: palette.fgDim
	},
	micro: {
		fontFamily: 'Cousine',
		fontSize: 0.5 * uiLength,
		textTransform: 'uppercase',
		color: palette.fgDim
	}
};
