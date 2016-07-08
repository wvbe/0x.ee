import './console-input.scss';

import React, {Component} from 'react';

export default class ConsoleInputComponent extends Component {
	constructor() {
		super();

		this.state = {
			input: ''
		}
	}
	handleInputChange(event) {
		let input = event.target.value;

		console.log('Inputted', input);

		this.setState({
			input
		});
	}

	handleSelectionChange(event) {
		if(window.document.activeElement !== this.inputElement)
			return;

		let selection = window.getSelection();

		console.log('handleSelectionChange', event.target, event.currentTarget, window.getSelection());
	}

	componentDidMount() {
		this.inputElement.addEventListener('change', this.handleInputChange.bind(this));
		window.document.addEventListener('selectionchange', this.handleSelectionChange.bind(this));
	}
	render() {
		return (<oksee-console-input>
			<input
				ref={ x => this.inputElement = x }
				value={this.state.input}
				onChange={this.handleInputChange.bind(this)}
			/>
			<oksee-console-input-backdrop>
				<oksee-console-input-ruler>{this.state.input}</oksee-console-input-ruler>
				<oksee-console-input-cursor />
			</oksee-console-input-backdrop>
		</oksee-console-input>);
	}
}
