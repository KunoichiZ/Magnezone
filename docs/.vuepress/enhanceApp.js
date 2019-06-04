import VueDiscordMessage from '../../node_modules/vue-discord-message';

export default ({ Vue }) => {
	Vue.use(VueDiscordMessage, {
        	avatars: {
			magnezone: 'https://media.discordapp.net/attachments/167426949482938370/584938976767639573/image0.png',
		},
	});
};