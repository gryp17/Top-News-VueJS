module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'max-len': 0,
		indent: ['error', 'tab'],
		'vue/script-indent': ['error', 'tab', {
			baseIndent: 1
		}],
		'no-tabs': 0,
		'comma-dangle': 0,
		'spaced-comment': 0,
		'import/no-dynamic-require': 0,
		'consistent-return': 0,
		radix: 0,
		'no-labels': 0,
		'no-continue': 0,
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		'no-plusplus': 0,
		'prefer-destructuring': 0,
		'arrow-body-style': 0,
		'no-unused-vars': ['error', { args: 'none' }],
		'no-param-reassign': ['error', { props: false }],
		'global-require': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'no-underscore-dangle': 0,
		'object-curly-newline': 0
	},
	//used together with the "vue/script-indent" rule
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				indent: 'off'
			}
		}
	],
	parserOptions: {
		parser: 'babel-eslint'
	}
};
