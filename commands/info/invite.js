const { Command } = require('awesome-commando');

module.exports = class AboutCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
      group: 'info',
      memberName: 'invite',
      description: 'Replies with an invite link to the server',
      examples: ['invite'],
      guildOnly: true
    });
  }

  run (msg) {
    const rulesChannel = msg.guild.channels.find(channel => channel.name === "rules");
    var options = {
        maxAge: 0,
        maxUses: 1,
        temporary: false,
        unique: true
    };

    rulesChannel.createInvite(rulesChannel.id, options).then(invite => 
        msg.say(invite.url)
    );
  }
};