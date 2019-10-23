const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Rule1Command extends Command {
  constructor (client) {
    super(client, {
      name: 'r1',
      group: 'rules',
      memberName: 'r1',
      description: 'Replies with the first rule of the server',
      examples: ['r1'],
      guildOnly: true
    });
  }

  run (msg) {
    const r1Embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Rule 1', 'Make sure to be familiar with and follow all PXR forum rules, which can be read here: [http://www.pokemoncrossroads.com/forum/showthread.php?152-Pokemon-Crossroads-Community-Rules](http://www.pokemoncrossroads.com/forum/showthread.php?152-Pokemon-Crossroads-Community-Rules)\n Notable rules include avoiding swearing at other members, keeping your content PG13, and not bullying other users.')
    return msg.channel.send(r1Embed);
  }
};