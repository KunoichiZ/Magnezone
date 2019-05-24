const {Command} = require('awesome-commando');

module.exports = class ReplyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'reply',
      group: 'test',
      memberName: 'reply',
      description: 'Replies with a Message.',
      examples: ['reply']
    });
  }

  run (msg) {
    return msg.say('Hi, I\'m awake!');
  }
};