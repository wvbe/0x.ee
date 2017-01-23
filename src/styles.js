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
	relative: {
		position: 'relative'
	}
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

const fg = color('#000'),
	bg = color('#fff');

export const palette = {
	fg: fg,
	fgDim: fg.blend(bg, 0.5),

	bg: bg,
	bgAlt: color('orange').darkenByRatio(0.5)
};

const fontFamily = glamor.fontFace({
	fontFamily: 'Share Tech Mono',
	fontStyle: 'normal',
	fontWeight: 400,
	src: "local('Share Tech Mono'), local('ShareTechMono-Regular'), url(https://fonts.gstatic.com/s/sharetechmono/v6/RQxK-3RA0Lnf3gnnnNrAsVlgUn8GogvcKKzoM9Dh-4E.woff2) format('woff2')",
	unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215'
});
export const steno = {
	header: {
		fontFamily: fontFamily,
		fontSize: 2 * uiLength,
		lineHeight: '1em'
	},
	normal: {
		fontFamily: fontFamily,
		fontSize: 0.8 * uiLength,
		lineHeight: '1em'
	},
	small: {
		fontFamily: fontFamily,
		fontSize: 0.7 * uiLength,
		textTransform: 'uppercase',
		color: palette.fgDim,
		lineHeight: '1em'
	},
	micro: {
		fontFamily: fontFamily,
		fontSize: 0.5 * uiLength,
		textTransform: 'uppercase',
		color: palette.fgDim,
		lineHeight: '1em'
	}
};
