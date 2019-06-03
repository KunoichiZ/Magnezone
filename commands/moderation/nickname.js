const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class NicknameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nickname',
      aliases: ['nick', 'n'],
      group: 'moderation',
      memberName: 'nickname',
      description: 'Nicknames the selected member with the provided nickname',
      examples: ['nickname AinoAlt KaoruAlt'],
      userPermissions: ['MANAGE_NICKNAMES'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member do you want to change the nickname of?',
            type: 'member'
        },
        {
            key: 'nickname',
            prompt: 'What name do you want to change their nickname to?',
            type: 'string'
        }
    ]
    });
  }

  run (msg) {
    
  }
};