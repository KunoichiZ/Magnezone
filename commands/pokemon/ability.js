const {Command} = require('awesome-commando');
const MessageEmbed = require('awesome-djs');
const Fuse = require('fuse.js');
var fs = require("fs");
let abilities = JSON.parse(fs.readFileSync("./data/ability.json", "utf8"))

var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name"
    ]
  };
  

module.exports = class AbilityCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ability',
      group: 'pokemon',
      memberName: 'ability',
      description: 'Replies with a description of a Pokemon\'s ability.',
      examples: ['ability Aftermath'],
      args: [
        {
            key: 'ability',
            prompt: 'What ability do you want more info on?',
            type: 'string'
        }
    ]
    });
  }

  run (msg) {
    var fuse = new Fuse(abilities, options); // "list" is the item array
    var result = fuse.search(ability);
    console.log(result)
    // const abilityEmbed = new MessageEmbed()
    //     .setColor(msg.member.displayHexColor)
    //     .setDescription(result)
    //     // .setDescription(`${args.member.user.username}, you've been poked by ${msg.author.username}!`)
    //     // .setImage(imgURLs[randomNum])
    // msg.channel.send(abilityEmbed);
    // return msg.say('Hi, I\'m awake!');
  }
};