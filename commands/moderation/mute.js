const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class MuteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'mute',
      aliases: ['m'],
      group: 'moderation',
      memberName: 'mute',
      description: 'Mutes the seected member for the desired amount of time',
      guildOnly: true,
      userPermissions: ['MANAGE_ROLES_OR_PERMISSIONS'],
      examples: ['mute AinoAlt 2h'],
      args: [
        {
            key: 'member',
            prompt: 'Which member should I mute?',
            type: 'member'
        },
        {
            key: 'duration',
            prompt: 'For how long should they be muted?',
            type: 'string'
        }
      ]
    });
  }

  run (msg) {
    
  }
};