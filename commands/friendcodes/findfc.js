const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const path = require('path');
const Database = require('better-sqlite3');
const { stripIndents } = require('common-tags');

module.exports = class AddFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'findfc',
      aliases: ['fc'],
      group: 'friendcodes',
      memberName: 'findfc',
      description: 'Finds the current user\'s Nintendo Switch Friend Code or displays the selected user\'s Friend Code',
      examples: ['findfc AinoAlt', 'fc'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Who did you want to find the Nintendo Switch Friend Code of?',
            type: 'member',
            default: msg => msg.member
        }
      ]
    });
  }

  run (msg, { member }) {

    const findfcEmbed = new MessageEmbed();
    const nickname = member.displayName;

    const conn = new Database(path.join(__dirname, '../../data/databases/friendcodes.sqlite3'));
    const { id, name, friendcode } = conn.prepare(`SELECT id, name, friendcode FROM "${msg.guild.id}" WHERE id= ?;`).get(member.id);
    // console.log(id, name, friendcode);
    
    try {
        if(id == null) {
            msg.channel.send("No Friend Code was added!");
        } else {
            findfcEmbed
                .setColor(msg.member.displayHexColor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle('**Friend Code Found**')
                .setDescription(stripIndents`**Name**
                    ${name}
                    **Nickname**
                    ${nickname}
                    **Friend Code**
                    ${friendcode}`);
            return msg.channel.send(findfcEmbed);
        }
    } catch (err) {
        msg.channel.send("An error occurred!")
    }
  }
};