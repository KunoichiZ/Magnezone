module.exports = {
    title: 'Officer Magnezone',
		description: 'Documentation for the Pokemon Crossroads (PXR) Discord Bot',
		head: [
			['link', { rel: 'icon', href: '/logo.png' }]
		],
    logo: '/logo.png',
    theme: 'yuu',
    themeConfig: {
			yuu: {
				colorThemes: ['blue', 'red']
			},
			repo: 'KunoichiZ/Magnezone',
			base: '/Magnezone/',
			docsDir: 'docs',
			sidebarDepth: 3,
			editLinks: true,
			nav: [
      	{ text: 'Home', link: '/' },
				{ text: 'Commands', link: '/commands/' },
				{ text: 'Command Examples', link: '/command-examples/'},
      	{ text: 'PXR Discord Server', link: 'https://discord.gg/uxMSGK' }
    	]
		},
		lastUpdated: true
}