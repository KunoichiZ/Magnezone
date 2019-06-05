// CommandoBot has code for this
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

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
    let totalSeconds = (this.client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds.toFixed(2)} seconds`;

    const uptimeEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL({ format: 'png' }))
        .addField('Uptime', uptime)
        // .addField('Uptime', `I've been online for ${moment.duration(process.uptime(), "minutes").format('DD [days], HH [hours, ] mm [minutes and] ss [seconds]')}`);

    return msg.channel.send(uptimeEmbed);
  }
};