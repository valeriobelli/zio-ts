/** @type {import('@commitlint/types').UserConfig} */
const config = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'footer-empty': [0],
		'header-max-length': [2, 'always', 100],
		'references-empty': [0],
		'type-enum': [2, 'always', ['build', 'ci', 'deps', 'docs', 'feat', 'fix', 'refactor', 'test']],
	},
}

module.exports = config
