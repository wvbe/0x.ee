import React, {Component} from 'react';


export default class LuggageComponent extends Component {
	constructor () {
		super();
	}

	renderChildren () {
		return this.props.children.map(Child => <Child perspective={this.perspective} />);
	}
	render() {
		return (
			<div className='luggage'>
				<div className='luggage-world'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
