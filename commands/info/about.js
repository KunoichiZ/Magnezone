const {Command} = require('awesome-commando');
const MessageEmbed = require('awesome-djs');

module.exports = class AboutCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'about',
      group: 'info',
      memberName: 'about',
      description: 'Replies with information about the bot',
      examples: ['about']
    });
  }

  run (msg) {
    const aboutEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${this.client.user.username} Stats`, this.client.user.displayAvatarURL({ format: 'png' }))
        .addField('Owner', this.client.owners[0].tag, true)
        .addField('License', 'MIT')
        .addField('Source Code', 'https://github.com/KunoichiZ/PXR-Bot')
        .addField('Documentation', 'https://www.pxr-bot.kunoichiz.me/');

    return msg.channel.send(aboutEmbed);
  }
};