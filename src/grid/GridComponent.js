import React, {Component} from 'react';

import GridItemComponent from './GridItemComponent';
import ToastComponent from '../toast/ToastComponent';

const initialQueue = [
	'Loading 0xEE',

	'Mounting THX visual mainframe',
	'Mounting DDR redundancy programmes',
	'Mounting malware deflectors: CSS, HTML',

	'Aligning VGA arrays',
	'Indexing quantifiers',
	'Prerendering 1080p HD CGI',
	'Waiting for 801.x...',
	'Waiting for 801.x... done',
	'Melting microchips',
	'MAC panel shutdown',
	'Recalibrating matrix...',
	'Recalibrating matrix... done',

	'COM alarms are down, navigate the multi-byte bus so you can RV with FOB'
];
const uiLength = 14,
	gridBorderWidth = 1,
	gridLengthUnit = uiLength * 8 + 2 * 3; // scss equiv of $grid-length-unit

function handleResize() {
	let gridDimensions = this.gridElement.getBoundingClientRect(),
		gridWidth = gridDimensions.width, // width - 1x grid border - grid padding left - grid padding right
		gridHeight = gridDimensions.height,
		width = Math.max(1, Math.floor(gridWidth / (gridLengthUnit + gridBorderWidth))),
		height = Math.max(1, Math.floor(gridHeight/ (gridLengthUnit + gridBorderWidth))),
		itemCount = width * height;

	if(itemCount < this.items.length) {
		this.items.splice(itemCount, this.items.length - itemCount);
	} else if(itemCount > this.items.length) {
		while(this.items.length < itemCount) {
			this.items.push({})
		}
	}

	this.setState({
		width,
		height
	});
}
function convertToNumberingScheme(number) {
	let baseChar = ('A').charCodeAt(0),
		letters  = '';

	do {
		number -= 1;
		letters = String.fromCharCode(baseChar + (number % 26)) + letters;
		number = (number / 26) >> 0;
	} while(number > 0);

	return letters;
}

function startToast() {
	let derp = () => {
		this.setState({
			queue: this.state.queue.slice(1)
		});
		if(this.state.queue.length)
			setTimeout(derp, 50 + 100 * Math.random());

		// @NOTICE: assumed the queue has at least 5 items initially
		if(this.state.queue.length === 5)
			this.handleResize();
	};

	setTimeout(derp, 1000);
}
function mapForLength(iterations, fn) {
	let arr = [];
	for(let i = 0; i < iterations; ++i) {
		arr.push(fn(i, arr));
	}
	return arr;
}
export default class GridComponent extends Component {
	constructor() {
		super();
		this.items = [];
		this.state = {
			width: 0,
			height: 0,
			queue: initialQueue,
			animationStage: 0
		};
	}

	componentDidMount() {
		this.handleResize = handleResize.bind(this);

		//if(this.state.queue.length < 5)
		//	setImmediate(this.handleResize);

		startToast.call(this);

		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	renderItems (width, height) {
		return mapForLength(height, y => mapForLength(width, x => {
				// key serves as a good way to flatten the 2d array, as well
				// as be a somewhat spreadsheet-ish: "A1", "B1", "A2", "B2" (fltr)
				let key = convertToNumberingScheme(x + 1) + (y + 1);

				return <GridItemComponent key={key} x={x} y={y}>{key}</GridItemComponent>;
			}))
			.reduce((flat, arr) => flat.concat(arr), []);
	}

	render(){
		return (<oksee-grid ref={ x => this.gridElement = x } class={this.state.queue.length ? 'not-ready' : null}>
			{
				this.state.queue.length
					? <ToastComponent message={this.state.queue[0]}/>
					: null
			}
			{this.renderItems(this.state.width, this.state.height)}
		</oksee-grid>);
	}
}
