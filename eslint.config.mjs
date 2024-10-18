import fs from 'node:fs';
import kalimahAppsTailwind from '@kalimahapps/eslint-plugin-tailwind';
import eslintConfig from '@kalimahapps/eslint-config';
const vueGlobal = JSON.parse(fs.readFileSync('.eslintrc-auto-import.json', 'utf8'));
export default [
	...eslintConfig,
	{
		plugins: {
			kalimahAppsTailwind,
		},
		ignores: ['!.vitepress/', 'node_modules/'],
		rules: {
			'kalimahAppsTailwind/sort': 'warn',
			'kalimahAppsTailwind/multiline': 'warn',
		},
		languageOptions: vueGlobal,
	},
	{
		files: ['**/composables/*.?([cm])ts', '**/composables/*.?([cm])tsx'],
		rules: {
			'unicorn/filename-case': [
				'warn',
				{
					case: 'camelCase',
				},
			],
		},
	},
];