const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Fuse = require('fuse.js');
var fs = require("fs");
let abilities = JSON.parse(fs.readFileSync("./data/ability.json", "utf8"))

var options = {
  keys: ['name']
}

module.exports = class AbilityCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ability',
      group: 'pokemon',
      memberName: 'ability',
      description: 'Replies with a description of a Pokemon\'s ability.',
      examples: ['ability Aftermath'],
      guildOnly: true,
      args: [
        {
            key: 'ability',
            prompt: 'What ability do you want more info on?',
            type: 'string'
        }
    ]
    });
  }

  run (msg, {ability}) {
    // fuse.js
    var fuse = new Fuse(abilities.abilities, options); 
    var result = fuse.search(ability);

    const abilityEmbed = new MessageEmbed()
      .setColor(msg.member.displayHexColor)
      .addField('Name', result[0].name)
      .addField('Description', result[0].desc || result[0].shortDesc)
        
    return msg.channel.send(abilityEmbed);
  }
};