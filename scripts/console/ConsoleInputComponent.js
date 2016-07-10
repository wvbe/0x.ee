import './console-input.scss';

import React, {Component} from 'react';

export default class ConsoleInputComponent extends Component {
	constructor() {
		super();

		this.state = {
			input: '',
			hasFocus: false,
			selectionStart: 0,
			selectionEnd: 0
		};

		this.handleInputChange = function(event) {
			let input = event.target.value;
			this.setState({
				input
			});
		}.bind(this);
		this.handleSelectionChange = function(event) {
			if(window.document.activeElement !== this.inputElement)
				return;

			this.setState({
				selectionStart: this.inputElement.selectionStart,
				selectionEnd: this.inputElement.selectionEnd
			});
		}.bind(this);
		this.handleFocusChange = function(hasFocus, event) {
			this.setState({
				hasFocus: hasFocus
			});
		};
	}

	componentDidMount() {
		window.document.addEventListener('selectionchange', this.handleSelectionChange);
	}

	componentWillUnmount () {
		window.document.removeEventListener('selectionchange', this.handleSelectionChange);
	}

	renderInputRuler () {
		const spans = [];

		if(this.state.selectionStart > 0)
			spans.push(<span key='pre-cursor'>{this.state.input.substring(0, this.state.selectionStart)}</span>);

		spans.push(<oksee-console-input-cursor
			key='cursor'
			class={this.state.selectionStart === this.state.selectionEnd ? 'collapsed' : 'range'}>
			{this.state.input.substring(this.state.selectionStart, this.state.selectionEnd)}
		</oksee-console-input-cursor>);

		if(this.state.selectionEnd < this.state.input.length)
			spans.push(<span key='post-cursor'>{this.state.input.substring(this.state.selectionEnd)}</span>);

		return spans;
	}

	onClick (event) {
		if(!this.inputElement)
			return;

		this.inputElement.focus();

		event.preventDefault();
	}
	render() {
		return (<oksee-console-input
			onClick={this.onClick.bind(this)}
			class={this.state.hasFocus ? 'has-focus' : 'no-focus'}>
			<input
				ref={ x => this.inputElement = x }
				value={this.state.input}
				onChange={this.handleInputChange}
				onBlur={this.handleFocusChange.bind(this, false)}
				onFocus={this.handleFocusChange.bind(this, true)}
			/>
			<oksee-console-input-field>{this.renderInputRuler()}</oksee-console-input-field>
		</oksee-console-input>);
	}
}
