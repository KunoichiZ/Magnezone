const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = class UptimeCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'uptime',
      group: 'info',
      aliases: ['up', 'botuptime'],
      memberName: 'uptime',
      description: 'Displays how long the bot has been online',
      examples: ['uptime'],
      guildOnly: true
    });
  }

  run (msg) {
    const uptimeEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL({ format: 'png' }))
        .addField('Uptime', moment.duration(process.uptime() * 1000).format('D [days], H [hours] [and] m [minutes]'))

    return msg.channel.send(uptimeEmbed);
  }
};