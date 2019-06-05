const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Database = require('better-sqlite3');
const path = require('path');

module.exports = class AddFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'findfc',
      aliases: ['fc'],
      group: 'switch',
      memberName: 'findfc',
      description: 'Finds the current user\'s Nintendo Switch Friend Code or displays the selected user\'s Friend Code',
      examples: ['findfc AinoAlt', 'fc'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Who did you want to find the Nintendo Switch Friend Code of?',
            type: 'member',
            default: msg => msg.author
        }
      ]
    });
  }

  run (msg, { member }) {
    // Enter `myself` to display your own Friend Code'
    const id = msg.member.id;
    const conn = new Database(path.join(__dirname, '../../data/databases/friendcodes.sqlite3'));
    const findfcEmbed = new MessageEmbed();

        
    const { fc } = conn.prepare(`SELECT friendcode FROM "${msg.guild.id}" WHERE id = "${msg.author.id}"`).get(msg.author.id);
    findfcEmbed
        .setColor(msg.member.displayHexColor)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(`**Your Friend Code**
            ${fc}`);
    return msg.channel.send(findfcEmbed);
    // if(member == "myself") {
        
    // } else {

    // }
    // const id = member.id;
    // const name = member.user.tag;
    
    

    
  }
};