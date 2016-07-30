import './console-input.scss';

import React, {Component} from 'react';

// The time (ms) between user input logging to console and the controller starts logging output
const DELAY_BEFORE_INPUT_SEND = 100;

/**
 * An input bar with reactive cursor hack etc.
 */
export default class ConsoleInputComponent extends Component {
	constructor() {
		super();

		this.state = {
			busy: false,
			input: '',
			hasFocus: false,
			selectionStart: 0,
			selectionEnd: 0
		};

		this.handleKeyDown = function (event) {
			if(event.which === 8
				&& ['input', 'textarea'].indexOf(event.target.tagName.toLowerCase()) >= 0
				&& !this.state.input.length) {
				event.preventDefault();
			}
		}.bind(this);

		this.handleInputChange = function(event) {
			if(this.state.busy) {
				// @TODO: flare up with user message/icon
				return;
			}

			let input = event.target.value,
				old = this.state.input;

			this.setState({
				input
			});

			// Hack to avoid focus-but-not-focused bug
			if(old && !input) {
				setImmediate(() => {
					this.inputElement.blur();
					this.inputElement.focus();
				});
			}
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
			hasFocus
				? window.addEventListener('keydown', this.handleKeyDown)
				: window.removeEventListener('keydown', this.handleKeyDown);

			this.setState({ hasFocus });
		};
	}

	componentDidMount() {
		window.document.addEventListener('selectionchange', this.handleSelectionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.document.removeEventListener('selectionchange', this.handleSelectionChange);
	}

	onClick (event) {
		if(!this.inputElement)
			return;

		this.inputElement.focus();

		event.preventDefault();
	}

	onSubmit (event) {
		event.preventDefault();


		const input = this.state.input;

		this.setState({
			input: ''
		});

		return this.props.handleSubmit(input);
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

	render() {
		return (<oksee-console-input
			onClick={this.onClick.bind(this)}
			class={[
				this.state.hasFocus ? 'has-focus' : 'no-focus',
				'idle'//this.state.busy ? 'busy' : 'idle'
			].join(' ')}>
			<form onSubmit={this.onSubmit.bind(this)}>
				<input
					autoFocus={true}
					ref={ x => this.inputElement = x }
					value={this.state.input}
					onChange={this.handleInputChange}
					onBlur={this.handleFocusChange.bind(this, false)}
					onFocus={this.handleFocusChange.bind(this, true)}
				/>
			</form>
			<oksee-console-input-field>{this.renderInputRuler()}</oksee-console-input-field>
		</oksee-console-input>);
	}
}
