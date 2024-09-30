import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './tailwind.css';
import VueCompositionConverter from '@/tools/vue-composition-converter/index.vue';
import ToolsList from './ToolsList.vue';
import GoToButton from './GoToButton.vue';
import Layout from './Layout.vue';
export default {
	extends: DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		// register your custom global components
		app.component('VueCompositionConverter', VueCompositionConverter);
		app.component('ToolsList', ToolsList);
		app.component('GoToButton', GoToButton);
	},
} satisfies Theme;
