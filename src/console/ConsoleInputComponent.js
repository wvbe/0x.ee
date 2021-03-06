import './console-input.scss';

import React, {Component} from 'react';

import api from '../api';
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
			selectionEnd: 0,
			historyInput: null
		};

		this.onDestroy = [];

		this.stashedInput = null;
		this.historyCursor = 0;
		this.handleKeyDown = function (event) {
			if(event.which === 38 || event.which === 40) {
				let history = api.store.get('history');
				// 38 (up)
				if(event.which === 38 && this.historyCursor < history.length)
					++this.historyCursor;
				else if(event.which === 40 && this.historyCursor > 0)
					--this.historyCursor;
				this.setState({
					historyInput: history[history.length - this.historyCursor] || null
				});

				return event.preventDefault();
			} else if(this.historyCursor) {
				this.historyCursor = 0;
				this.setState({
					input: this.state.historyInput,
					historyInput: null
				});
			}


			// Stop backspaces from unfocusing anything for some reason
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
		this.onDestroy.push(api.on('busy', busyReasons => {
			this.setState({
				busy: !!busyReasons.length,
				busyMessage: busyReasons.join(', ')
			});
		}));
	}

	componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.document.removeEventListener('selectionchange', this.handleSelectionChange);
		this.onDestroy.forEach(cb => cb());
	}

	onClick (event) {
		if(!this.inputElement)
			return;

		this.inputElement.focus();

		event.preventDefault();
	}

	onSubmit (event) {
		event.preventDefault();

		const input = this.state.historyInput === null
			? this.state.input
			: this.state.historyInput;

		this.historyCursor = 0;

		this.setState({
			input: '',
			historyInput: null
		});

		if(!this.state.busy)
			this.props.handleSubmit(input);
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
			<oksee-console-input-field>{
				this.state.busy ? this.state.busyMessage : (this.state.historyInput === null ? this.renderInputRuler() : this.state.historyInput)
			}</oksee-console-input-field>
		</oksee-console-input>);
	}
}
