const {Command} = require('awesome-commando');

module.exports = class DiceCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'dice',
      aliases: ['roll', 'die'],
      group: 'misc',
      memberName: 'dice',
      description: 'Roll a 6-sided die',
      examples: ['dice', 'die', 'roll'],
      guildOnly: true
    });
  }

  run (msg) {
      function randomNumber() {
        var sides = 6;
        var randomNumber = Math.floor(Math.random() * sides) + 1;
        return randomNumber;
      }

    return msg.say("The dice roll was " + randomNumber() + ".");
  }
};