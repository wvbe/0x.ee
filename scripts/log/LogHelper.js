import './log.scss';

import React, {Component} from 'react';
import LogInputComponent from './LogInputComponent';
// import LogErrorComponent from './LogErrorComponent';

class LogHelper {
	constructor(console) {
		this.console = console;
	}

	raw (component) {
		this.console.output(component);
	}

	log (message) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='log'
			prefix={new Date().getTime()}
		>{message}</LogInputComponent>);
	}

	input (message) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='input'
			prefix='ANON'
		>{message}</LogInputComponent>);
	}

	error (error) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='error'
			prefix='SYS'
		>{error.stack || error.message || error}</LogInputComponent>);
	}
}
export default LogHelper;