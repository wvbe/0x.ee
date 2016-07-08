import './grid.scss';

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
		gridWidth = gridDimensions.width - 2 - 1 - 2, // width - 2x grid border - grid padding left - grid padding right
		gridHeight = gridDimensions.height - 2 - 4,
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
		itemCount,
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
			setTimeout(derp, 50 + 300 * Math.random());
	};

	setTimeout(derp, 1000);
}
export default class GridComponent extends Component {
	constructor() {
		super();
		this.items = [];
		this.state = {
			width: 1,
			height: 1,
			itemCount: 1,
			queue: initialQueue,
			animationStage: 0
		};
	}

	handleClick() {
		console.log('Derp');
	}

	componentDidMount() {
		this.handleResize = handleResize.bind(this);

		setImmediate(() => {
			this.handleResize();
		});

		startToast.call(this);

		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	renderItem(item, index, items) {
		const x = index % this.state.width,
			y = Math.floor(index/this.state.width);
		return (
			<GridItemComponent key={index}>{convertToNumberingScheme(x + 1)}{y + 1}</GridItemComponent>
		);
	}
	render(){
		return (<oksee-grid
				ref={ x => this.gridElement = x }
				data-animation-stage={this.state.queue.length ? 'queue' : 'ready'}
			>
			{
				this.state.queue.length
					? <ToastComponent message={this.state.queue[0]}/>
					: null
			}
			{this.items.map(this.renderItem, this)}
		</oksee-grid>);
	}
}
