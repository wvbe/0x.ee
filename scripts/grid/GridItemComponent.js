import React, {Component} from 'react';

export default class GridItemComponent extends Component {
	constructor () {
		super();
		this.powerUpTimeout = null;
		this.state = {
			enabled: true,
			bootupProgress: 1 - 2 * Math.random()
		};
	}

	powerUp() {
		if(!this.state.enabled || this.state.bootupProgress >= 1)
			return;

		this.setState({
			bootupProgress: Math.random() < 0.02
				? 1
				: this.state.bootupProgress + (0.21 - 0.4 * Math.random())
		});


		this.powerUpTimeout = setTimeout(this.powerUp.bind(this), 30 + 70 * Math.random());
	}

	componentDidMount () {
		this.powerUp();
	}
	componentWillUnmount () {
		clearTimeout(this.powerUpTimeout);
	}
	render() {
		return (<oksee-grid-item class={Math.random() < this.state.bootupProgress ? 'visible' : 'hidden'}>
			<oksee-grid-item-content>{this.props.children}</oksee-grid-item-content>
		</oksee-grid-item>);
	}
}
