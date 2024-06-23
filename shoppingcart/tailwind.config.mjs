/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			container:{
				center:true,
				padding:"1.5rem",
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
