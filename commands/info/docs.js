const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class DocsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'docs',
      aliases: ['documentation'],
      group: 'info',
      memberName: 'docs',
      description: 'Replies with a link to the bot\'s documentation',
      examples: ['docs']
    });
  }

  run (msg) {
    const docsEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Officer Magnezone\'s Documentation', 'https://www.magnezone.kunoichiz.me/');
        
    return msg.channel.send(docsEmbed);
  }
};