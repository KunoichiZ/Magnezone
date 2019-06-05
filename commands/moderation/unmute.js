const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class UnmuteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'unmute',
      aliases: ['um'],
      group: 'moderation',
      memberName: 'unmute',
      description: 'Unmutes the selected member',
      examples: ['unmute AinoAlt'],
      userPermissions: ['MANAGE_ROLES'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member should I mute?',
            type: 'member'
        }
    ]
    });
  }

  run (msg, { member }) {
    if(member.manageable) {
      const muteRole = msg.guild.roles.find(role => role.name === "Muted");
      if(member.roles.find(r => r.name === "Muted")) {
        member.roles.remove(muteRole);
  
        const unmuteEmbed = new MessageEmbed()
          .setColor(msg.member.displayHexColor)
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setDescription(`**Action:** Unmuted <@${member.id}>`);

        const modlogsChannel = this.client.channels.get('585656872355364864');
        modlogsChannel.send(unmuteEmbed);

        // return msg.channel.send(unmuteEmbed);
      } else {
        return msg.channel.send("User is not currently muted!");
      }
      
    }
  }
};