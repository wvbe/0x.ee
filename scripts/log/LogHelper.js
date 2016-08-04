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

	log (message, prefix) {
		this.raw(<LogInputComponent
			time={new Date()}
			connotation='log'
			prefix={prefix || 'LOG'}
		>{message}</LogInputComponent>);
	}

	input (message) {
		this.raw(<LogInputComponent
			time={new Date()}
			connotation='input'
			prefix='#!/'
		>{message}</LogInputComponent>);
	}

	error (error) {
		this.raw(<LogInputComponent
			time={new Date()}
			connotation='error'
			prefix='ERROR'
		>{error.stack || error.message || error}</LogInputComponent>);
	}
}
export default LogHelper;