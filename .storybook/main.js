module.exports = {
	stories: [
		'../packages/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-storysource',
		'storybook-addon-performance/register'
	],
	framework: '@storybook/react',
	features: {
		emotionAlias: false,
	},
	webpackFinal: (config) => {
		// https://github.com/polkadot-js/extension/issues/621#issuecomment-759341776
		// framer-motion uses the .mjs notation and we need to include it so that webpack will
		// transpile it for us correctly (enables using a CJS module inside an ESM).
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		})
		// Return the altered config
		return config
	},
}