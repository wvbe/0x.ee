import colorJs from 'color-js';
import * as glamor from 'glamor';

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
	alignStart: {
		alignItems: 'flex-start'
	},
	justifyEnd: {
		justifyContent: 'flex-end'
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
export const padding = {
	field: {
		padding: '0 2px'
	},
	button: {
		padding: '0.25em 0.5em'
	},
	flatButton: {
		padding: '0 0.5em'
	}
};


export const connotation = {
	interactive: {
		':hover': {
			cursor: 'pointer'
		}
	}
};
export const display = {
	block: {
		display: 'block'
	},
	inlineBlock: {
		display: 'inline-block'
	}
};

export const position = {
	relative: { position: 'relative' },
	fixed: { position: 'fixed' },
	absolute: { position: 'absolute' }
};

const uiLength = 14;
export const length = {
	micro: 2,
	small: 0.5 * uiLength,
	line: 1 * uiLength,
	large: 4 * uiLength,
	gridItem: 8 * uiLength
};


export function color (input) {
	return colorJs(input);
};

const fg = color('#e2e2e2'),
	bg = color('#0f161d');

export const palette = {
	fg: fg,
	fgDim: fg.blend(bg, 0.5),
	fgAlt: color('#13b85c'),
	bg: bg,
	bgAlt: color('#fff'), //color('#008c39'),


	error: color('#f14b32'),
};

const fontFamily = {
	normal: glamor.fontFace({
		fontFamily: 'Roboto Mono',
		fontStyle: 'normal',
		fontWeight: 400,
		src: "local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v4/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2')",
		unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215'
	})
};

export const steno = {
	header: {
		fontFamily: fontFamily.normal,
		fontSize: 2 * uiLength,
		lineHeight: 2 * uiLength + 'px',
		marginBottom: '0.25em'
	},
	normal: {
		fontFamily: fontFamily.normal,
		fontSize: 0.8 * uiLength,
		lineHeight: 1 * uiLength + 'px',
		whiteSpace: 'pre-wrap'
	},
	small: {
		fontFamily: fontFamily.normal,
		fontSize: 0.7 * uiLength,
		textTransform: 'uppercase',
		color: palette.fgDim,
		lineHeight: 1 * uiLength + 'px'
	},
	micro: {
		fontFamily: fontFamily.normal,
		fontSize: 0.6 * uiLength,
		color: palette.fgDim,
		textTransform: 'uppercase',
		lineHeight: 1 * uiLength + 'px'
	}
};

export const border = {
	subtle: {
		border: '1px dotted ' + palette.fg.toString()
	},
	strong: {
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: palette.fg.toString()
	}
};

export const theme = {
	normal: {
		color: palette.fg.toString(),
		backgroundColor: palette.bg.toString()
	},
	dim: {
		color: palette.fg.blend(palette.bg, 0.5).toString()
	},
	inverse: {
		color: palette.bg.toString(),
		backgroundColor: palette.fg.blend(bg, 0.3).toString()
	},
	error: {
		color: palette.error.darkenByRatio(0.3).toString(),
		backgroundColor: palette.error.lightenByRatio(0.9).toString()
	}
};

export const overflow = {
	auto: {
		// @TODO scrollbars
		overflow: 'auto'
	}
};
