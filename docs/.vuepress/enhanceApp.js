import VueDiscordMessage from '../../node_modules/vue-discord-message';

export default ({ Vue }) => {
	Vue.use(VueDiscordMessage, {
		// avatars: {
		// 	djs: require('../images/discord-avatar-djs.png'),
		// },
	});
};