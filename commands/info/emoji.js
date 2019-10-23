const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EmojiCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'emoji',
      group: 'info',
      aliases: ['listemoji'],
      memberName: 'emoji',
      description: 'Displays the server\'s emoji',
      examples: ['emoji', 'listemoji'],
      guildOnly: true
    });
  }

  run (msg) {
    const emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");
    const changelogEmbed = new MessageEmbed();
    changelogEmbed
        .setColor('#11806a')
        .addField('Emoji', emojiList);
    
    return msg.channel.send(changelogEmbed);
  }
};