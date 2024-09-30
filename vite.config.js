import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import AutoImport from 'unplugin-auto-import/vite';
import VueIconsResolver from '@kalimahapps/vue-icons/resolver';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
	worker: {
		format: 'es',
	},
	plugins: [
		tsconfigPaths(),
		AutoImport({
			// autoimport tools except test files
			dirs: ['./tools/**', '!./tools/**/tests'],
			dts: true,
			// global imports to register
			imports: [
				// presets
				'vue',
			],
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},
		}),
		Components({
			resolvers: [VueIconsResolver],
		}),
	],
});