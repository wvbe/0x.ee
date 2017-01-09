import React, {Component} from 'react';
import EventEmitter from '../util/EventEmitter';

var index = 0;
export default class Window extends EventEmitter {
	constructor (name, content) {
		super();
		this.id = ++index;
		this.name = name;
		this.content = content;
	}
}
