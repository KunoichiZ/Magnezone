const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');

module.exports = class MuteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'mute',
      aliases: ['m'],
      group: 'moderation',
      memberName: 'mute',
      description: 'Mutes the selected member for the desired amount of time',
      guildOnly: true,
      userPermissions: ['MANAGE_ROLES'],
      examples: ['mute AinoAlt 2h'],
      args: [
        {
            key: 'member',
            prompt: 'Which member should I mute?',
            type: 'member'
        },
        {
            key: 'duration',
            prompt: 'For how long should they be muted? You can either choose `1hr`, 2hrs`, or `1d`',
            type: 'string',
            default: ''
        }
      ]
    });
  }

  run (msg, { member, duration }) {
    console.log(member);
    if(member.manageable) {
      const muteRole = msg.guild.roles.find(role => role.name === "Muted");

      member.roles.add(muteRole);

      const muteEmbed = new MessageEmbed()
          .setColor(msg.member.displayHexColor)
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setDescription(`**Action:** Muted <@${member.id}>\n
            **Duration:** ${duration ? duration : 'Until manually removed'}`
          );
      const muteMessage = await msg.embed(muteEmbed)

      if (duration) {
        if(duration === '1hr') {
          setTimeout(async () => {
            await member.roles.remove(muteRole);
            msg.say(`**Action:** Mute duration ended, unmuted ${member.displayName} (<@${member.id}>)`)

            return muteMessage.edit('', muteEmbed);
          }, 3600000);
        } else if(duration === '2hrs') {
          setTimeout(async () => {
            await member.roles.remove(muteRole);
            msg.say(`**Action:** Mute duration ended, unmuted ${member.displayName} (<@${member.id}>)`)

            return muteMessage.edit('', muteEmbed);
          }, 7200000);
        } else if(duration === '1d') {
          setTimeout(async () => {
            await member.roles.remove(muteRole);
            msg.say(`**Action:** Mute duration ended, unmuted ${member.displayName} (<@${member.id}>)`)

            return muteMessage.edit('', muteEmbed);
          }, 86400000);
        } else {
          msg.say("That is not one of the valid time formats!");
        }
      }
      
      return msg.channel.send(muteEmbed);
    }
  }
};