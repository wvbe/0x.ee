import React, {Component} from 'react';

export default class GridItemComponent extends Component {
	render() {
		return (<oksee-grid-item>
			<oksee-grid-item-content>{this.props.children}</oksee-grid-item-content>
		</oksee-grid-item>);
	}
}
