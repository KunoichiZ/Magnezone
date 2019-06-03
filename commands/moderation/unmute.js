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
      userPermissions: ['MANAGE_ROLES_OR_PERMISSIONS'],
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

  run (msg) {
    
  }
};