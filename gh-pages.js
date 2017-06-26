const ghpages = require('gh-pages');

console.log('Publishing');
ghpages.publish(
	'build',
	{
		repo: 'git@github.com:wvbe/wvbe.github.io.git',
		branch: 'master'
	},
	err => err ?
		console.error('  FAIL\n\n' + err.message) :
		console.log('  OK')
);
