const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'warn',
      aliases: ['w'],
      group: 'moderation',
      memberName: 'warn',
      description: 'Warns the selected member',
      examples: ['warn AinoAlt 1 annoying'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3,
      },
      args: [
        {
            key: 'member',
            prompt: 'Which member should I give a warning?',
            type: 'member'
        },
        {
            key: 'points',
            prompt: 'How many warning points should I give this member?',
            type: 'integer'
        },
        {
            key: 'reason',
            prompt: 'What is the reason for this warning?',
            type: 'string',
            default: ''
        }
    ]
    });
  }

  run (msg) {
    
  }
};