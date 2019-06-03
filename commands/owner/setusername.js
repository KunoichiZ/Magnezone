const {Command} = require('awesome-commando');

module.exports = class SetUsernameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setusername',
      aliases: ['setun'],
      group: 'owner',
      memberName: 'setusername',
      description: 'Sets the username of the bot.',
      examples: ['setusername PXR'],
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          key: 'username',
          prompt: 'What username to set?',
          type: 'string',
          default: 'Officer Magnezone'
        }
      ]
    });
  }

  async run (msg, {username}) {

    try {
      const user = await this.client.user.setUsername(username);
      
      return msg.embed({description: `My new username is ${user.username}`});
    } catch (err) {
      return console.error(err);
    }
  }
};