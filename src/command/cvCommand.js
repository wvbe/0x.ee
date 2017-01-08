import './cvWindow.scss';

import AskNicely from 'ask-nicely';
import React, {Component} from 'react';
import mugshotImage from './mugshot.jpg';
import terribleAnimatedHeaderImage from './cv-header.gif';
import terribleAnimatedCounterImage from './cv-counter.gif';
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

	<h1>Experience</h1>
	<table>
		<tbody>
			<tr>
				<th>Employer</th>
				<th>Period</th>
				<th>Job description</th>
			</tr>
			<tr>
				<td><a href="http://liones.nl" target="_blank">Liones</a><br />Interaction designer</td>
				<td>April '13 - Present</td>
				<td>Tailoring the FontoXML editor to achieve the best user experience and world domination. Determining user needs and providing integration with their work environment. Design and development of specialized extensions. Train occasional- and power users in this new part of their workflow.</td>
			</tr>
			<tr>
				<td><a href="http://fontoxml.com" target="_blank">FontoXML</a><br />Javascript developer</td>
				<td>January '14 - Present</td>
				<td>Leveraging state-of-the-art technology for an unparalleled structured authoring experience. Design and development of a highly modular web application.</td>
			</tr>
			<tr>
				<td><a href="http://liones.nl" target="_blank">Liones</a><br />Graduate internship</td>
				<td>February '14 - June '14</td>
				<td>Researching and developing interaction designs for editing topic-based structured XML documents (DITA) in a presentation-oriented (WYSIWYM) way.</td>
			</tr>
			<tr>
				<td>x-54<br />Owner</td>
				<td>October '09 - June '14</td>
				<td>Web development services ranging from graphic design to programming and hosting. Although still registered with the Chamber of Commerce, I've effectively stopped freelancing after graduating (and joining Liones and FontoXML) in 2014.</td>
			</tr>
			<tr>
				<td><a href="http://www.esocietyinstituut.nl/" target="_blank">eSociety</a><br />Usability internship</td>
				<td>May '12 - October '12</td>
				<td>Working on iPad applications fit to improve the life of people with dementia and their carers. My work for eSociety Institute includes researching the currently existing applications that can be implemented for this cause, and developing an iPad application in accordance with the team's expert opinion and my own findings.</td>
			</tr>
		</tbody>
	</table>

	<h1>Education</h1>
	<table>
		<tbody>
			<tr>
				<th>Diploma</th>
				<th>Institution</th>
				<th>Year</th>
			</tr>
			<tr>
				<td>Bachelor of Information and Communication Technology in Communication and Multimedia Design</td>
				<td>The Hague University of Applied Sciences</td>
				<td>2014</td>
			</tr>
			<tr>
				<td>VWO (NT & NG)</td>
				<td>Oranje Nassau College (Parkdreef)</td>
				<td>2008</td>
			</tr>
		</tbody>
	</table>

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
