
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');

module.exports = class EmojiInfoCommand extends Command {
    constructor (client) {
      super(client, {
        name: 'emojiinfo',
        memberName: 'emojiinfo',
        group: 'info',
        description: 'Displays information about the selected emoji',
        examples: ['emojiinfo fortune'],
        guildOnly: true,
        args: [
          {
            key: 'emote',
            prompt: 'What emoji do you want the information of?',
            type: 'string'
          }
        ]
      });
    }
  
   run (msg, {emote}) {
      const emojiName = emote;
      const emoji = msg.guild.emojis.find(emoji => emoji.name === emote);

      // console.log(test.createdAt);
      console.log(msg.guild.member.displayHexColor);
      const emojiinfoEmbed = new MessageEmbed();
      emojiinfoEmbed
         .setColor(msg.member.displayHexColor)
         .setTitle(`${emoji} ${emojiName}`)
         .addField('ID', emoji.id)
         .addField('Added to Server', moment.utc(emoji.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        
      return msg.channel.send(emojiinfoEmbed);
    }
  };
