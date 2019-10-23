const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Rule3Command extends Command {
  constructor (client) {
    super(client, {
      name: 'r3',
      aliases: ['rule3'],
      group: 'rules',
      memberName: 'r3',
      description: 'Replies with the third rule of the server',
      examples: ['r3'],
      guildOnly: true
    });
  }

  run (msg) {
    const r3Embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Rule 3', 'Breaking rules in this server may end up in a punishment on the forum as well, depending on the nature and severity.')
    return msg.channel.send(r3Embed);
  }
};