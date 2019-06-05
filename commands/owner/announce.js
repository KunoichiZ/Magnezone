const {Command} = require('awesome-commando');

module.exports = class AnnounceCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'announce',
      aliases: ['news'],
      group: 'owner',
      memberName: 'announce',
      description: 'Creates an announcement',
      examples: ['announce Test message'],
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
            key: 'announcement',
            prompt: 'What do you want to announce?',
            type: 'string'
        }
    ]
    });
  }

 
  run (msg, { announcement }) {
    const announcementChannel = this.client.channels.get('584760935860928512');
    announcementChannel.send(announcement);
    
  } 
};