import './toast.scss';

import React, {Component} from 'react';

export default class ToastComponent extends Component {
	render() {
		return (<oksee-toast>
			{this.props.message}
		</oksee-toast>);
	}
}
