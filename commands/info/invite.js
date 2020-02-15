const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
      group: 'info',
      memberName: 'invite',
      description: 'Replies with an invite link to the server',
      examples: ['invite'],
      guildOnly: true,
      ownerOnly: true
    });
  }

  run (msg) {
    const rulesChannel = msg.guild.channels.find(channel => channel.name === "rules");

    rulesChannel.createInvite({ temporary: false, reason: 'New invite', maxAge: 0, maxUses: 0, unique: true }).then(invite => 
        msg.say(invite.url)
    );
  }
};