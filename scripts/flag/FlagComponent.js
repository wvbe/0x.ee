import './flag.scss';

import React, {Component} from 'react';
import PropertiesComponent from '../components/PropertiesComponent';
import logoImageUrl from './logo.png';
import packageJson from 'json!../../package.json';

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
		return (<oksee-flag class="flex-row flex-gutter">
			<oksee-logo>
				<img src={logoImageUrl} />
			</oksee-logo>
			<PropertiesComponent {...flagProperties} />
		</oksee-flag>);
	}
}
