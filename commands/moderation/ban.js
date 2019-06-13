const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ban',
      aliases: ['b'],
      group: 'moderation',
      memberName: 'ban',
      description: 'Bans a member from the server',
      examples: ['ban AinoAlt annoying'],
      userPermissions: ['BAN_MEMBERS'],
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
    if (member.id === msg.author.id) return msg.reply('I don\'t think you want to ban yourself.');
    if (!member.bannable) return msg.reply('I cannot ban that member, their role is probably higher than my own!');
    // const user = msg.mentions.users.first();
    member.ban(reason !== '' ? reason : 'No reason given by staff');

    const banEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setDescription(`
          **Member:** ${member.user.tag} (${member.id})\n
          **Action:** Ban\n
          **Reason:** ${reason !== '' ? reason : 'No reason given by staff'}`
        );
    
    const modlogsChannel = this.client.channels.get('585656872355364864');
    modlogsChannel.send(banEmbed);

    // return msg.channel.send(banEmbed);
  }
};