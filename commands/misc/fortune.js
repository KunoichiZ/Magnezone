const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Fuse = require('fuse.js');
var fs = require("fs");
let fortunes = JSON.parse(fs.readFileSync("./data/fortunes.json", "utf8"))

var fortuneOptions = {
    keys: ['id']
}

module.exports = class FortuneCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'fortune',
      group: 'misc',
      aliases: ['cookie'],
      memberName: 'fortune',
      description: 'Displays a random fortune',
      examples: ['fortune', 'cookie'],
      guildOnly: true
    });
  }

  run (msg) {
    const fortune = this.client.emojis.find(emoji => emoji.name === "fortune");
    var random = Math.floor(Math.random() * 54) + 1;
    var randomTxt = random.toString();
    var fortunesFuse = new Fuse(fortunes.fortunes, fortuneOptions); 
    var result = fortunesFuse.search(randomTxt);
    const fortuneEmbed = new MessageEmbed();
    // console.log(randomTxt)
    // console.log(result[0].msg)
    
    
    fortuneEmbed
        .setColor('#ffff00')
        .addField(`${fortune} Fortune`, result[0].msg)
    
    return msg.channel.send(fortuneEmbed);
  }
};