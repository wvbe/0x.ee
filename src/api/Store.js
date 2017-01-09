export default class Store {
	constructor () {
		this.defaults = {};
	}

	get (name) {
		let val = window.localStorage.getItem(name);

		if(val === null && this.defaults[name])
			return this.defaults[name];

		return JSON.parse(window.localStorage.getItem(name));
	}

	setDefault (name, val) {
		this.defaults[name] = val;
	}

	set (name, val) {
		window.localStorage.setItem(name, JSON.stringify(val));
	}

	push (name, val) {
		return this.set(name, this.get(name).concat([val]));
	}

	remove (name) {
		window.localStorage.removeItem(name);
	}
}

