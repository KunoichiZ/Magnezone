// lb=kg*2.2046 (kg to pounds)
// ft=m*3.2808 (meters to ft)
const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Fuse = require('fuse.js');
var fs = require("fs");
let pokedex = JSON.parse(fs.readFileSync("./data/pokedex.json", "utf8"))
let dexEntries = JSON.parse(fs.readFileSync("./data/dexEntries.json", "utf8"))

var dexOptions = {
  keys: ['species']
}

var entOptions = {
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
    var pokemonFuse = new Fuse(pokedex.pokedex, dexOptions); 
    var result = pokemonFuse.search(pokemon);

    var entriesFuse = new Fuse(dexEntries.entries, entOptions);
    var entResult = entriesFuse.search(result[0].species);

    var color = result[0].color;

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

    
    var heightFt = result[0].heightm * 3.2808;
    var weightLb = result[0].weightkg * 2.2046;

    const pokeData = {
        species: '',
        abilities: '',
        evos: '',
        prevos: '',
        genders: ''
    }
    
    // get abilities
    for (const ability in result[0].abilities) {
        if (ability === '0') {
            pokeData.abilities += `${result[0].abilities[ability]}`;
        } else if (ability === 'H') {
            pokeData.abilities += `, *${result[0].abilities[ability]}*`;
        } else {
            pokeData.abilities += `, ${[result[0]].abilities[ability]}`;
        }
    }

    var hp, atk, def, spa, spd, spe;
    hp = result[0].baseStats.hp;
    atk = result[0].baseStats.atk;
    def = result[0].baseStats.def;
    spa = result[0].baseStats.spa;
    spd = result[0].baseStats.spd;
    spe = result[0].baseStats.spe;

    // switch (result[0].gender) {
    //     case 'N':
    //         pokeData.genders = 'None';
    //         break;
    //     case 'M':
    //         pokeData.genders = '100% ♂';
    //         break;
    //     case 'F':
    //         pokeData.genders = '100% ♀';
    //         break;
    //     default:
    //         pokeData.genders = '50% ♂ | 50% ♀';
    //         break;
    // }

    if (result[0].genderRatio) {
        pokeData.genders = `${result[0].genderRatio.M * 100}% ♂ | ${result[0]
            .genderRatio.F * 100}% ♀`;
    }

    // get evolutions
    if(result[0].prevo) {
        pokeData.prevos = result[0].prevo;
    }

    if(result[0].evos) {
        pokeData.evos = result[0].evos;
    }

    var species = result[0].species.toLowerCase();

    const pokedexEmbed = new MessageEmbed()
      .setColor(getColor(color))
      .setThumbnail(`https://play.pokemonshowdown.com/sprites/xyani/${species}.gif`)
      .addField('Name', result[0].species)
      .addField('Pokedex Number', result[0].num, true)
      .addField('Types', result[0].types.join(', '), true)
      .addField('Gender', pokeData.genders, true)
      .addField('Base Stats', 'HP: ' + `**${hp}**` + ', ATK: ' + `**${atk}**` + ', DEF: ' + `**${def}**` + ', SPA: ' + `**${spa}**` + ', SPDEF: ' + `**${spd}**` + ', SPEED: ' + `**${spe}**`)
      .addField('Height', result[0].heightm + ' m (' + heightFt.toFixed(2) + ' ft)', true)
      .addField('Weight', result[0].weightkg + ' kg (' + weightLb.toFixed(2) + ' lbs)', true)
      .addField('Abilities', pokeData.abilities, true)
    if(result[0].prevo) {
        pokedexEmbed.addField('Pre-Evolution', pokeData.prevos, true)
    }
    if(result[0].evos) {
        pokedexEmbed.addField('Evolution', pokeData.evos, true)
    }
      // evos
    if(result[0].evoLevel) {
        pokedexEmbed.addField('Evolution Level', result[0].evoLevel, true)
    }
      pokedexEmbed.addField('Egg Groups', result[0].eggGroups.join(', '), true)
      pokedexEmbed.addField('Pokedex Data', entResult[0].desc)
        
    return msg.channel.send(pokedexEmbed);
  }
};