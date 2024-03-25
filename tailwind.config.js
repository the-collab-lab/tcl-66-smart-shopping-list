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
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderWidth: {
				1: '1px',
			},
		},
	},
	plugins: [],
};
