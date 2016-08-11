const events = Symbol('events');

class EventEmitter {
	constructor () {
		this[events] = [];
	}

	on (name, cb) {
		if(!this[events][name])
			this[events][name] = [];
	
		this[events][name].push(cb);
	
		return () => this[events][name].splice(this[events][name].indexOf(cb), 1);
	}

	emit (name, ...args) {
		if(this[events][name])
			this[events][name].forEach(cb => cb(...args));
	}
}

export default EventEmitter;