import React from 'react';
import * as styles from '../styles';

import MenuItemComponent from './MenuItemComponent';

const menuStyle = styles.merge(
	styles.flex.vertical,
	styles.flex.alignStart,
	styles.flex.fixed);

export default function MenuComponent ({ commands }) {
	return (
		<oksee-menu  { ...menuStyle }>
			{ commands.map(cmd => <MenuItemComponent key={ cmd } input={ cmd } />) }
		</oksee-menu>
	);
}
