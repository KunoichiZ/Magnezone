
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class EmojiInfoCommand extends Command {
    constructor (client) {
      super(client, {
        name: 'emojiinfo',
        memberName: 'emojiinfo',
        group: 'info',
        description: 'Displays information about the selected emoji',
        examples: ['emojiinfo AinoMinako'],
        guildOnly: true,
        args: [
          {
            key: 'emoji',
            prompt: 'What emoji do you want the information of?',
            type: 'member'
          }
        ]
      });
    }
  
   run (msg, {emoji}) {
      const emojiName = emoji;
      const test = msg.guild.emojis.filter(emoji => emoji.name === emoji).first()
      const emojiinfoEmbed = new MessageEmbed();
      emojiinfoEmbed
        .setColor(msg.guild.member.displayHexColor)
       
        
      return msg.channel.send(emojiinfoEmbed);
    }
  };
