// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: "src/",
	modules: [
		// Simple usage
		"@nuxtjs/stylelint-module",

		// With options
		[
		"@nuxtjs/stylelint-module",
		{
			/* module options */
		},
		],
	],
});
