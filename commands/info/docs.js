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
      examples: ['docs'],
      guildOnly: true
    });
  }

  run (msg) {
    const docsEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Officer Magnezone\'s Documentation', 'https://magnezone.netlify.com/');
        
    return msg.channel.send(docsEmbed);
  }
};