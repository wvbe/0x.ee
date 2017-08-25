import React from 'react';
import * as styles from '../styles';

const bannerStyle = styles.merge(
	styles.flex.vertical,
	styles.flex.fixed);

const subtitleStyle = styles.merge(
	styles.theme.dim,
	styles.steno.normal,
	{
		marginBottom: styles.length.line
	});

export default function MenuComponent ({ title, subtitle }) {
	return (
		<div { ...bannerStyle}>
			<div { ...styles.merge(styles.steno.header) }>{ title }</div>
			<div { ...subtitleStyle }>{ subtitle }</div>
		</div>
	);
}
