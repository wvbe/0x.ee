import React, {Component} from 'react';

export default class PropertiesComponent extends Component {
	renderProperty(name, index, propertyNames) {
		return (<oksee-property key={index}>
				<oksee-property-key>
					{name}
				</oksee-property-key>
				<oksee-property-value>
					{this.props[name]}
				</oksee-property-value>
			</oksee-property>);
	}
	render() {
		return (<oksee-properties>
			{ Object.keys(this.props).map(this.renderProperty.bind(this)) }
		</oksee-properties>);
	}
}
