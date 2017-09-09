
import React, {Component} from 'react';
import * as styles from '../styles';

function getClockTime (date) {
	date = date || new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const prefixStyle = styles.merge(
	styles.flex.fixed,
	styles.flex.horizontal,
	{ width: 1.5 * styles.length.gridItem });



export default class LogInputComponent extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return false;
	}

	render() {
		let style = null;

		const nuggetStyle = styles.merge({
			marginRight: styles.length.line,
			maxWidth: this.props.connotation === 'input' ? 'initial' : '60em'
		});

		if (this.props.connotation === 'input') {
			style = styles.merge(
				styles.flex.horizontal,
				styles.theme.highlighted,
				styles.padding.button);
		}
		else if (this.props.connotation === 'error') {
			style = styles.merge(
				styles.flex.horizontal,
				styles.theme.error,
				styles.padding.button);
		}
		else {
			style = styles.merge(
				styles.flex.horizontal,
				styles.padding.flatButton)

		}

		return (<oksee-log-message { ...style } data-connotation={this.props.connotation || 'log'}>
			<oksee-log-prefix { ...prefixStyle }>
				<div { ...nuggetStyle }>{getClockTime(this.props.time)}</div>
				<div { ...nuggetStyle }>{this.props.prefix}</div>
				{/*<div className="arrow" />*/}
			</oksee-log-prefix>
			<oksee-log-content { ...nuggetStyle } { ...styles.merge(styles.flex.fluid) }>{this.props.children}</oksee-log-content>
		</oksee-log-message>);
	}
}
