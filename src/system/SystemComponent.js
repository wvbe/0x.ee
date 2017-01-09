import React, {Component} from 'react';

export default class SystemComponent extends Component {
	render() {
		return (<oksee-system class="flex-column flex-gutter">
			{this.props.children}
		</oksee-system>);
	}
}
