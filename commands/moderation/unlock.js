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
      examples: ['unlock']
    });
  }

  run (msg) {
    
  }
};