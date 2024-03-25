const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xsm: '275px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
			'2xl': '1920px',
		},
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			borderWidth: {
				1: '1px',
			},
			colors: {
				// Custom colors for Light Mode theming //
				appBg: '#F9FAFB',
				navBg: '#ffffff',
				item: '#ffffff',
				checkedItem: '#E5E7EB',
				list: '#ffffff',
				hover: '#F3F4F6',
				inputBorder: '#6B7280',
				navBorder: '#E5E7EB',
				baseFont: '#121212',
				// Custom colors for Dark Mode theming //
				appBgDark: '#121212',
				navBgDark: '#282828',
				itemDark: '#3f3f3f',
				checkedItemDark: '#282828',
				listDark: '#3f3f3f',
				hoverDark: '#575757',
				inputBorderDark: '#575757',
				navBorderDark: '#000000',
				baseFontDark: '#b4b4b4',
			},
		},
	},
	plugins: [],
};
