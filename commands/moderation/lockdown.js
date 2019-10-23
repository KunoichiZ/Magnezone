const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class LockdownCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'lockdown',
      aliases: ['ld', 'lock'],
      group: 'moderation',
      memberName: 'lockdown',
      description: 'Locks down the channel',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
      clientPermissions: ['MANAGE_CHANNELS'],
      examples: ['lockdown']
    });
  }

  async run (msg) {
    const lockEmbed = new MessageEmbed();
    const modlogsChannel = this.client.channels.get('585656872355364864');
    const overwrite = await msg.channel.overwritePermissions({
      permissionOverwrites: [
          {
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
              id: msg.member.roles.highest.id
          },
          {
              deny: ['SEND_MESSAGES'],
              id: msg.guild.defaultRole.id
          }
      ],
      reason: 'Channel Lockdown',
    });

    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: false
    })

    lockEmbed
        .setColor(msg.member.displayHexColor)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(`**Action:** 🔒 locked the \`${msg.channel.name}\` channel.\n
            **Details:** Only staff can now access this channel. Use \`${msg.guild.commandPrefix}unlock\` in this channel to unlock the channel`)
        .setTimestamp();

    modlogsChannel.send(lockEmbed);

    if (msg.deletable) {
      msg.delete();
    }

    return msg.channel.send(lockEmbed);
  }
};