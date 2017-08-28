import React from 'react';
import * as styles from '../styles';

import ConsoleOutputComponent from './ConsoleOutputComponent';
const consoleOutputStyle = styles.merge(
	styles.flex.fluid,
	styles.flex.vertical,
	styles.steno.normal,
	{
		width: 4 * styles.length.gridItem,
		textAlign: 'left',
		marginLeft: styles.length.line
	});
const bottomConsole = styles.merge(
	styles.flex.fluid,
	styles.flex.vertical,
	styles.flex.justifyEnd,
	styles.position.relative,
	{
		overflow: 'hidden',
		paddingTop: styles.length.micro,
		borderTop: '0.5px solid #999'
	});
const topConsole = styles.merge(
	styles.flex.fixed,
	{
		marginBottom: styles.length.micro
	});

export default function MenuComponent ({ loggerTop, loggerBottom }) {
	return (
		<div { ...consoleOutputStyle }>
			<div { ...topConsole }>
				<ConsoleOutputComponent
					logger={ loggerTop }
					maxHistory={ 5 }
				/>
			</div>
			<div { ...bottomConsole }>
				<ConsoleOutputComponent
					logger={ loggerBottom }
					maxHistory={ 100 }
					maxHeight={ 100 }
				/>
			</div>
		</div>
	);
}
