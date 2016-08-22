import AskNicely from 'ask-nicely';
import React, {Component} from 'react';

export default (app) => {
	app.console
		.addCommand('motd')
		.setDescription('The message of the day, an introduction for new visitors.')
		.setController((req, res) => {
			res.log('Retrieving message of today');
			return new Promise(resolve => {
				setTimeout(() => {
					res.log('Message of the day: ' + (new Date().toString()));
					(`
_______/\\\\\\\\\\_____________________/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_
 _____/\\\\\\///\\\\\\__________________\\/\\\\\\///////////__\\/\\\\\\///////////__
  ___/\\\\\\/__\\///\\\\\\________________\\/\\\\\\_____________\\/\\\\\\_____________
   __/\\\\\\______\\//\\\\\\__/\\\\\\____/\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\\\_____\\/\\\\\\\\\\\\\\\\\\\\\\_____
    _\\/\\\\\\_______\\/\\\\\\_\\///\\\\\\/\\\\\\/__\\/\\\\\\///////______\\/\\\\\\///////______
     _\\//\\\\\\______/\\\\\\____\\///\\\\\\/____\\/\\\\\\_____________\\/\\\\\\_____________
      __\\///\\\\\\__/\\\\\\_______/\\\\\\/\\\\\\___\\/\\\\\\_____________\\/\\\\\\_____________
       ____\\///\\\\\\\\\\/______/\\\\\\/\\///\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_
        ______\\/////_______\\///____\\///__\\///////////////__\\///////////////__`)
						.split('\n').forEach(line => res.log(line, 'ascii'));

					res.log('');
					res.log('-----------------------------------------------------------------------------');
					res.log(`           YOU HAVE REACHED THE PORTFOLIO SITE OF WYBE MINNEBO`);
					res.log(`       interaction designer, javascript developer and what have you`);
					res.log('-----------------------------------------------------------------------------');
					res.log('');
					res.log(`Welcome to 0x.ee v 4.0.0-alpha, it has regenerative javascript and extra-futuristic flavour.`);
					res.log(`Though the command line interface doesn't feel as HTML5 as it actually is, CLI is the most powerful way of communicating with a 'puter.`);
					resolve();
				}, 500)
			})
		});
}