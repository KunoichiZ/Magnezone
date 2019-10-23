const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Rule5Command extends Command {
  constructor (client) {
    super(client, {
      name: 'r5',
      aliases: ['rule5'],
      group: 'rules',
      memberName: 'r5',
      description: 'Replies with the fifth rule of the server',
      examples: ['r5'],
      guildOnly: true
    });
  }

  run (msg) {
    const r5Embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Rule 5', 'If you see someone breaking the rules, ping or DM one of the PXR Discord Staff (<@147800635046232064>, <@330534759795130370>, or <@167430839519412224>).')
    return msg.channel.send(r5Embed);
  }
};