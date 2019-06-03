const {Command} = require('awesome-commando');

module.exports = class SetAvatarCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setavatar',
      aliases: ['setava'],
      group: 'owner',
      memberName: 'setavatar',
      description: 'Sets the avatar of the bot.',
      examples: ['setavatar'],
      guildOnly: true,
      ownerOnly: true
    });
  }

  async run (msg) {

    try {
      const user = await this.client.user.setAvatar('https://media.discordapp.net/attachments/167426949482938370/584938976767639573/image0.png');
      
      return msg.embed({description: 'Avatar changed!'});
    } catch (err) {
      return console.error(err);
    }
  }
};