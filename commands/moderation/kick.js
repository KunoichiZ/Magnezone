// const member = <message>.mentions.members.first();
// member.kick();
const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'kick',
      aliases: ['k'],
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks a member from the server',
      examples: ['kick AinoAlt annoying'],
      userPermissions: ['KICK_MEMBERS'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member should I ban?',
            type: 'member'
        },
        {
            key: 'reason',
            prompt: 'What is the reason for this banishment?',
            type: 'string',
            default: ''
        }
      ]
    });
  }

  run (msg, { member, reason }) {
    if (member.id === msg.author.id) return msg.reply('I don\'t think you want to kick yourself.');
    if (!member.kickable) return msg.reply('I cannot kick that member, their role is probably higher than my own!');
    // const user = msg.mentions.users.first();
    member.kick(reason !== '' ? reason : 'No reason given by staff');

    const kickEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setDescription(`
          **Member:** ${member.user.tag} (${member.id})\n
          **Action:** Kick\n
          **Reason:** ${reason !== '' ? reason : 'No reason given by staff'}`
        )

    const modlogsChannel = this.client.channels.get('585656872355364864');
    modlogsChannel.send(kickEmbed);

    // return msg.channel.send(kickEmbed);
  }
};