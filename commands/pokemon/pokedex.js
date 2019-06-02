// lb=kg*2.2046 (kg to pounds)
// ft=m*3.2808 (meters to ft)
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Fuse = require('fuse.js');
var fs = require("fs");
let pokedex = JSON.parse(fs.readFileSync("./data/pokedex.json", "utf8"))

var options = {
  keys: ['species']
}

module.exports = class AbilityCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'pokedex',
      aliases: ['dex'],
      group: 'pokemon',
      memberName: 'pokedex',
      description: 'Replies with information about a Pokemon',
      examples: ['pokedex Bulbasaur'],
      guildOnly: true,
      args: [
        {
            key: 'pokemon',
            prompt: 'What Pokemon do you want more info on?',
            type: 'string'
        }
    ]
    });
  }

  
  run (msg, {pokemon}) {
    var fuse = new Fuse(pokedex.pokedex, options); 
    var result = fuse.search(pokemon);
    var color = result[0].color;

    // console.log(result)

    function getColor(color) {
        switch (color) {
            case 'Black':
                return '#323232';
            case 'Blue':
                return '#257CFF';
            case 'Brown':
                return '#A3501A';
            case 'Gray':
                return '#969696';
            case 'Green':
                return '#3EFF4E';
            case 'Pink':
                return '#FF65A5';
            case 'Purple':
                return '#A63DE8';
            case 'Red':
                return '#FF3232';
            case 'White':
                return '#E1E1E1';
            case 'Yellow':
                return '#FFF359';
            default:
                return '#FF0000';
        }
      }

    // "num": 2,
    //     "species": "Ivysaur",
    //     "types": ["Grass", "Poison"],
    //     "genderRatio": { "M": 0.875, "F": 0.125 },
    //     "baseStats": { "hp": 60, "atk": 62, "def": 63, "spa": 80, "spd": 80, "spe": 60 },
    //     "abilities": { "0": "Overgrow", "H": "Chlorophyll" },
    //     "heightm": 1,
    //     "weightkg": 13,
    //     "color": "'Green'",
    //     "prevo": "bulbasaur",
    //     "evos": ["venusaur"],
    //     "evoLevel": 16,
    //     "eggGroups": ["Monster", "Grass"]
    var heightFt = result[0].heightm * 3.2808;
    var weightLb = result[0].weightkg * 2.2046;

    const pokeData = {
        abilities: {},
        evos: '',
        genders: ''
    }
    
    // get abilities
    pokeData.abilities[0] = result[0].abilities[0];
    if(result[0].abilities[1]) {
        pokeData.abilities[1] = result[0].abilities[1];
    }
    if(result[0].abilities[2]) {
        pokeData.abilities[2] = result[0].abilities[2];
    }
    // console.log(pokeData.abilities)

    const pokedexEmbed = new MessageEmbed()
      .setColor(getColor(color))
      .addField('Name', result[0].species)
      .addField('Pokedex Number', result[0].num)
      .addField('Height', result[0].heightm + ' (' + heightFt + ' ft)', true)
      .addField('Weight', result[0].weightkg + ' (' + weightLb + ' lbs)')
    if(result[0].abilities[0]) {
        pokedexEmbed.addField('Ability', result[0].abilities[0])
    } else if(result[0].abilities[0] && result[0].abilities[1]) {
        pokedexEmbed.addField('Abilities', result[0].abilities[0] + ', ' + result[0].abilities[1])
    }
    if(result[0].evoLevel) {
        pokedexEmbed.addField('Evolution Level', result[0].evoLevel)
    }
        
    return msg.channel.send(pokedexEmbed);
  }
};