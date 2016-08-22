class UserManager {
	constructor () {
	}

	currentUser () {
		return { name: 'Anon', short: 'ANO' };
	}
	systemUser () {
		return { name: 'System', short: 'SYS' };
	}


}

export default new UserManager ();