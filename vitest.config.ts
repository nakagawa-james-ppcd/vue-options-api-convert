import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [vue()],
 	test: {
		exclude: [...configDefaults.exclude],
		coverage: {
			provider: 'istanbul',
			reporter: ['text'],

			exclude: [...configDefaults.coverage?.exclude ?? [], 'tools/**/tests/**'],
		},
	},
});