
import React, {Component} from 'react';
import * as styles from '../styles';

function getClockTime (date) {
	date = date || new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const style = styles.merge(
	styles.flex.horizontal
);
const prefixStyle = styles.merge(
	styles.flex.fixed,
	styles.flex.horizontal,
	{ width: styles.length.gridItem });

const nuggetStyle = styles.merge({
	marginRight: styles.length.line
});
export default class LogInputComponent extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return false;
	}

	render() {
		return (<oksee-log-message { ...style } data-connotation={this.props.connotation || 'log'}>
			<oksee-log-prefix { ...prefixStyle }>
				<div { ...nuggetStyle }>{getClockTime(this.props.time)}</div>
				<div { ...nuggetStyle }>{this.props.prefix}</div>
				{/*<div className="arrow" />*/}
			</oksee-log-prefix>
			<oksee-log-content { ...nuggetStyle }>{this.props.children}</oksee-log-content>
		</oksee-log-message>);
	}
}
