export default function debounce (delay, fn) {
	var timeout = null,
		index = 0;

	return (...args) => {
		++index;

		if(timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			timeout = null;

			fn(index, ...args);

			index = 0;
		}, delay);
	}
};
