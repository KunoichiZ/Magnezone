const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class AboutCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'about',
      group: 'info',
      memberName: 'about',
      description: 'Replies with information about the bot',
      examples: ['about'],
      guildOnly: true
    });
  }

  run (msg) {
    let totalSeconds = (this.client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;

    const aboutEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${this.client.user.username} Stats`, this.client.user.displayAvatarURL({ format: 'png' }))
        .addField('Owner', this.client.owners[0].tag, true)
        .addField('Uptime', uptime)
        .addField('License', 'GPL-3.0')
        .addField('Source Code', 'https://github.com/KunoichiZ/Magnezone')
        .addField('Documentation', 'https://magnezone.kunoichiz.me/');

    return msg.channel.send(aboutEmbed);
  }
};