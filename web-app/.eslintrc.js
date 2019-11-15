module.exports = {
	parser: 'typescript-eslint-parser',
	extends: [
		// 'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		// 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		// 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		// 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			useJSXTextNode: true,
		},
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g.
		'arrow-parens': 0,
		'comma-dangles': 0,
		'global-require': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-named-as-default': 0,
		'import/prefer-default-export': 0,
		'jsx-a11y/href-no-hash': 0,
		quotes: ['error', 'single'],
		'no-tabs': 0,
		'react/jsx-curly-spacing': 0,
		'react/jsx-indent-props': 'off',
		'react/prop-types': 0,
		'react/sort-comp': 0,
		'react/prefer-stateless-function': 0,
		semi: ['error', 'never'],
		'object-curly-newline': 0,
		'react/jsx-indent': 'off',
		'class-methods-use-this': 0,
		indent: 'off',
		'implicit-arrow-linebreak': 'off',
		'function-paren-newline': 'off',
		'lines-between-class-members': 'off',
		'no-unreachable': 'off',
		'import/no-unresolved': 'off',
		'no-unused-vars': 'off',
		'no-confusing-arrow': 'off',
		'no-restricted-syntax': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'guard-for-in': 'off',
		'no-nested-ternary': 'off',
		'no-underscore-dangle': 'off',
		'react/destructuring-assignment': 'off',
		'no-return-assign': 'off',
		'no-case-declarations': 'off',
		'react/no-array-index-key': 'off',
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
}
