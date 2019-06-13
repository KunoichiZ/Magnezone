const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class AvatarCommand extends Command {
    constructor (client) {
      super(client, {
        name: 'avatar',
        memberName: 'avatar',
        group: 'info',
        aliases: ['icon'],
        description: 'Displays the avatar of the entered user',
        examples: ['avatar AinoMinako'],
        guildOnly: true,
        args: [
          {
            key: 'member',
            prompt: 'What user do you want the avatar of?',
            type: 'member'
          }
        ]
      });
    }
  
    run (msg, {member}) {
      const avatarEmbed = new MessageEmbed();
      avatarEmbed
        .setColor(msg.guild.member.displayHexColor)
        .setTitle(member.displayName + '\'s avatar')
        .setImage(member.user.displayAvatarURL({format: 'png'}));
      
      return msg.channel.send(avatarEmbed);
    }
  };