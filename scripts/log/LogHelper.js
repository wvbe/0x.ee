import './log.scss';

import React, {Component} from 'react';
import LogInputComponent from './LogInputComponent';
// import LogErrorComponent from './LogErrorComponent';

class LogHelper {
	constructor() {
		this.outputListeners = [];
	}

	raw (component) {
		this.outputListeners.forEach(callback => callback(component));
	}


	onOutput (callback) {
		this.outputListeners.push(callback);

		return function () {
			this.outputListeners.splice(this.outputListeners.indexOf(callback), 1);
		}.bind(this);
	}

	log (message) {
		let time = new Date();
		this.raw(<LogInputComponent
			time={time}
			connotation='log'
			prefix='LOG'
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
			prefix='ERROR'
		>{error.stack || error.message || error}</LogInputComponent>);
	}
}
export default LogHelper;