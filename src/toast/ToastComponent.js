import React, {Component} from 'react';
import * as styles from '../styles';

const style = styles.merge(
	styles.display.block,
	styles.position.absolute,
	{
		left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)'
	});
export default class ToastComponent extends Component {
	render() {
		return (<oksee-toast { ...style }>
			{this.props.message}
		</oksee-toast>);
	}
}
