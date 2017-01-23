import React, {Component} from 'react';
import * as styles from '../styles';
import api from '../api';

const inlineInputStyle = styles.merge({
	height: styles.length.line,
	lineHeight: styles.length.line + 'px',
	verticalAlign: 'middle',
	whiteSpace: 'pre'
});
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

	mouseEnter = () => {
		this.setState({
			hasHover: true
		});
	};

	mouseLeave = () => {
		this.setState({
			hasHover: false
		});
	};

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


		const textStyle = styles.merge(
			inlineInputStyle,
			{
				display: 'inline-block'
			}),
			cursorColor = this.state.hasFocus
				? styles.palette.fg.toString()
				: this.state.hasHover ? styles.palette.fgDim.toString() : '#ccc',
			cursorStyle = styles.merge(
				textStyle,
				{
					height: styles.length.line,
					minWidth: styles.length.small,
					backgroundColor: cursorColor,
					border: '1px solid ' + cursorColor,
					boxSizing: 'border-box',
					color: styles.palette.bg.toString()
				});

		if(this.state.selectionStart > 0)
			spans.push(<span key='pre-cursor' { ...textStyle }>{this.state.input.substring(0, this.state.selectionStart)}</span>);

		if (!this.state.busy)
			spans.push(<oksee-console-input-cursor
				key='cursor'
				{ ...cursorStyle }>
				{this.state.input.substring(this.state.selectionStart, this.state.selectionEnd)}
			</oksee-console-input-cursor>);

		if(this.state.selectionEnd < this.state.input.length)
			spans.push(<span key='post-cursor' { ...textStyle }>{this.state.input.substring(this.state.selectionEnd)}</span>);

		return spans;
	}

	render() {
		const inputStyle = styles.merge(
			styles.display.block,
			{
				cursor: 'pointer',
				backgroundColor: styles.palette.bg,
				border: '1px dotted ' + styles.palette.fg.toString(),
				padding: 1
			});
		const formStyles = styles.merge({
			position: 'absolute',
			opacity: 0,
			width: 0,
			height: 0,
			overflow: 'hidden'
		});
		const fieldStyles = styles.merge(
			styles.display.block,
			inlineInputStyle
		);
		return (<oksee-console-input
			{ ...inputStyle }
			onClick={this.onClick.bind(this)}
			onMouseEnter={ this.mouseEnter }
			onMouseLeave={ this.mouseLeave }
			class={[
				this.state.hasFocus ? 'has-focus' : 'no-focus',
				'idle'//this.state.busy ? 'busy' : 'idle'
			].join(' ')}>
			<form
				onSubmit={this.onSubmit.bind(this)}
				{ ...formStyles }>
				<input
					autoFocus={true}
					ref={ x => this.inputElement = x }
					value={this.state.input}
					onChange={this.handleInputChange}
					onBlur={this.handleFocusChange.bind(this, false)}
					onFocus={this.handleFocusChange.bind(this, true)}
				/>
			</form>
			<oksee-console-input-field { ...fieldStyles }>{
				this.state.busy ? this.state.busyMessage : (this.state.historyInput === null ? this.renderInputRuler() : this.state.historyInput)
			}</oksee-console-input-field>
		</oksee-console-input>);
	}
}
