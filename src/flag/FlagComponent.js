import React, {Component} from 'react';
import PropertiesComponent from '../components/PropertiesComponent';
import logoImageUrl from './logo.png';
const packageJson = {
	name: '0x.ee',
	version: '4.0.0-alpha',
	author: {
		name: 'wvbe',
		email: 'wybe@x-54.com'
	},
	homepage: 'http://0x.ee'
};

const flagProperties = {
	'Title': packageJson.name,
	'Release': packageJson.version,
	'Author': (<span>
		{packageJson.author.name} (<a href={'mailto:' + packageJson.author.email}>{packageJson.author.email}</a>)
	</span>),
	'URL': <a href={packageJson.homepage}>{packageJson.homepage}</a>
};

export default class FlagComponent extends Component {
	render() {
		return (<oksee-flag class="flex-row flex-gutter flex-items-center flex-fixed">
			<oksee-logo>
				<img src={logoImageUrl} />
			</oksee-logo>
			<PropertiesComponent {...flagProperties} />
		</oksee-flag>);
	}
}
