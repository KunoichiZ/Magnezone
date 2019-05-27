import VueDiscordMessage from '../../node_modules/vue-discord-message';

export default ({ Vue }) => {
	Vue.use(VueDiscordMessage, {
        avatars: {
			pxrbot: 'https://i.imgur.com/718m2uK.png',
		},
	});
};