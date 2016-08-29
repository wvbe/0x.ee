import './cvWindow.scss';

import AskNicely from 'ask-nicely';
import React, {Component} from 'react';
import mugshotImage from './mugshot.jpg';
import terribleAnimatedHeaderImage from './cv-header.gif';
import terribleAnimatedCounterImage from './cv-counter.gif';
import terribleAnimatedEmailImage from './cv-email.gif';
import PropertiesComponent from '../components/PropertiesComponent';


const cvProperties = {
	'Name': 'Wybe Minnebo',
	'Gender': 'Male (M)',
	'Nat.': 'Dutch (NL)',
	'Birth': '10-JUL-1988'
};

const cvContent = <div className="cv-root">
	<img src={terribleAnimatedHeaderImage} alt="curriculum vitae" />

	<div className="flex-row flex-gutter flex-items-center">
		<div className="flex-fixed">
			<img src={mugshotImage} style={{ width: '100px', height: '100px' }} />
		</div>
		<div className="flex-fluid">
			<PropertiesComponent {...cvProperties} />
		</div>
	</div>

	<hr />

	<p>My professional vitae so far has been:</p>
	<ol>
		<li>Teach self to write HTML, CSS, PHP, MySQL (2001 - 2013)</li>
		<li>Start entrepreneuring as a freelance webdeveloper and graphic designer (2009 - 2014)</li>
		<li>Student's job at <a href="http://liones.nl" target="_blank">Liones</a> (2013 - 2014)</li>
		<li>Get diploma (2010 - 2014)</li>
		<ul>
			<li>Internship designing an app for Alzheimers patients (2012)</li>
			<li>Internship designing a user-friendly webbased XML editor (2014)</li>
		</ul>
		<li>Full-time employment at <a href="http://fontoxml.com" target="_blank">FontoXML</a> (2014 - current)</li>
		<ul>
			<li>Lots of cool stuff</li>
		</ul>
	</ol>

	<div style={{textAlign: 'center'}}>
		<p>The amount of visitors on my home page: <img src={terribleAnimatedCounterImage} /></p>
		<p><b>Copyright (c) 2003 Wybe Minnebo, the netherlands</b></p>
		<p style={{fontSize: '0.5em'}}>If you are the maker of the animated gifs on this site you can have full copyright. please email us and we will give you major credit or even affiliate with you!!!!</p>
	</div>
</div>;

export default function (app) {
	app.console
		.addCommand('cv')
		.addAlias('resume')
		.setDescription('curriculum vitae')
		.setController((req, res) => {
			res.log('Opening curriculum vitae window');
			res.log('-------------------------------');

			app.emit('window:new', 'curriculum vitae', cvContent);
		});
}
