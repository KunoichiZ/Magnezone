const {Command} = require('awesome-commando');
const sides = ['heads','tails'];

module.exports = class CoinflipCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'coinflip',
      aliases: ['coin'],
      group: 'misc',
      memberName: 'coinflip',
      description: 'Flip a coin',
      examples: ['coin', 'coinflip'],
      guildOnly: true
    });
  }

  run (msg) {
    return msg.say(`The coin landed on ${sides[Math.floor(Math.random() * sides.length)]}.`);
  }
};