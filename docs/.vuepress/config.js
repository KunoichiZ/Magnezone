module.exports = {
    title: 'PXR Discord Bot',
		description: 'Documentation for the PXR Discord Bot',
		head: [
			['link', { rel: 'icon', href: '/logo.png' }]
		],
    logo: '/logo.png',
    theme: 'yuu',
    themeConfig: {
			yuu: {
				colorThemes: ['blue', 'red']
			},
			repo: 'KunoichiZ/PXR-Bot',
			base: '/PXR-Bot/',
			docsDir: 'docs',
			sidebarDepth: 3,
			editLinks: true,
			nav: [
      	{ text: 'Home', link: '/' },
      	{ text: 'Commands', link: '/commands/' },
      	{ text: 'PXR Discord Server', link: 'https://discord.gg/VE7SSpp' }
    	]
		},
		lastUpdated: true
}