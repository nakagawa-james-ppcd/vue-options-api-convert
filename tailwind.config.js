import plugin from 'tailwindcss/plugin';

const softScrollbar = plugin(({ addUtilities }) => {
	addUtilities({
		'.soft-scrollbar': {
			'&::-webkit-scrollbar': {
				width: '5px',
				height: '5px',
				cursor: 'pointer',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				cursor: 'pointer',
			},
			'&::-webkit-scrollbar-thumb:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.3)',
				cursor: 'pointer',
			},
			'&::-webkit-scrollbar-track': {
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				cursor: 'pointer',
			},
		},
		'.dark .soft-scrollbar': {
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#94a3b8',
			},
			'&::-webkit-scrollbar-thumb:hover': {
				backgroundColor: '#64748b',
			},
			'&::-webkit-scrollbar-track': {
				backgroundColor: '#475569',
			},
		},
	});
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./.vitepress/**/*.{vue,js,ts,jsx,tsx}', './tools/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				desktop: '900px',
			},
		},
	},
	plugins: [softScrollbar],
};