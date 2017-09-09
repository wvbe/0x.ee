import React from 'react';


const cvProperties = {
	'Name': 'Wybe Minnebo',
	'Gender': 'Male (M)',
	'Nat.': 'Dutch (NL)',
	'Birth': '10-JUL-1988'
};

const cvContent = <iframe style={{display:'flex', flex: '1 1 auto', width: '100%' }} src={ '/cv.pdf' } />;

export default function (app) {
	app.console
		.addCommand('cv')
		.addAlias('resume')
		.setDescription('curriculum vitae')
		.setController((req, res) => {
			res.log('Opening curriculum vitae window');
			res.log('-------------------------------');

			app.emit('window:new', 'curriculum vitae', cvContent, { size: 0.6, ratio: 16/9 });
		});
}
