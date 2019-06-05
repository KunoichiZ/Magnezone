// CommandoBot has code for this
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
require("moment-duration-format");

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
        .addField('Uptime', `I've been online for ${moment.duration(process.uptime(), "minutes").format('DD [days], HH [hours, ] mm [minutes and] ss [seconds]')}`);

    return msg.channel.send(uptimeEmbed);
  }
};