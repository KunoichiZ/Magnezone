const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class UnlockCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'unlock',
      aliases: ['ul'],
      group: 'moderation',
      memberName: 'unlock',
      description: 'Unlocks the channel',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
      clientPermissions: ['MANAGE_CHANNELS'],
      examples: ['unlock'],
      args: [
        {
            key: 'lockrole',
            prompt: 'Which role to apply the lockdown to?',
            type: 'role',
            default: 'everyone',
        }
      ]
    });
  }

  async run (msg) {
    const unlockEmbed = new MessageEmbed();
    const modlogsChannel = this.client.channels.get('585656872355364864');
    const overwrite = await msg.channel.overwritePermissions({
      permissionOverwrites: [
        {
          allow: ['SEND_MESSAGES'],
          id: msg.guild.defaultRole.id,
      }
      ],
      reason: 'Channel Lockdown',
    });

    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: true
    })

    unlockEmbed
        .setColor(msg.member.displayHexColor)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(`**Action:** 🔓 unlocked the \`${msg.channel.name}\` channel.
        **Details:** This channel can now be used by everyone again. Use \`${msg.guild.commandPrefix}lockdown\` in this channel to (re)-lock it.`)
        .setTimestamp();

    modlogsChannel.send(unlockEmbed);

    if (msg.deletable) {
      msg.delete();
    }

    return msg.channel.send(unlockEmbed);
  }
};