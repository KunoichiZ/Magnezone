const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
require("moment-duration-format");

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
    const aboutEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${this.client.user.username} Stats`, this.client.user.displayAvatarURL({ format: 'png' }))
        .addField('Owner', this.client.owners[0].tag, true)
        .addField('Uptime', `I've been online for ${moment.duration(process.uptime()).format('DD [days], HH [hours, ] mm [minutes and] ss [seconds]')}`)
        .addField('License', 'GPL-3.0')
        .addField('Source Code', 'https://github.com/KunoichiZ/Magnezone')
        .addField('Documentation', 'https://www.magnezone.kunoichiz.me/');

    return msg.channel.send(aboutEmbed);
  }
};