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
		>{message}</LogInputComponent>);
	}

	input (message) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='input'
		>{message}</LogInputComponent>);
	}

	error (error) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='error'
		>{error.stack || error.message || error}</LogInputComponent>);
	}
}
export default LogHelper;