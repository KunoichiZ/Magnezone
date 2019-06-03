const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

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

  run (msg) {
    
  }
};