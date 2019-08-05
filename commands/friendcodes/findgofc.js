const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const path = require('path');
const Database = require('better-sqlite3');
const { stripIndents } = require('common-tags');

module.exports = class FindGoFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'findgofc',
      aliases: ['gofc'],
      group: 'friendcodes',
      memberName: 'findgofc',
      description: 'Finds the current user\'s Pokemon Go Friend Code or displays the selected user\'s Friend Code',
      examples: ['findgofc AinoAlt', 'gofc'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Who did you want to find the Pokemon Go Friend Code of?',
            type: 'member',
            default: msg => msg.member
        }
      ]
    });
  }

  run (msg, { member }) {

    // const name = member.user.tag;
    const findgofcEmbed = new MessageEmbed();
    const nickname = member.displayName;

    const conn = new Database(path.join(__dirname, '../../data/databases/gofriendcodes.sqlite3'));
    const { id, name, friendcode } = conn.prepare(`SELECT id, name, friendcode FROM "${msg.guild.id}" WHERE id= ?;`).get(member.id);
    
    try {
        if(id == null) {
            msg.channel.send("No Friend Code was added!");
        } else {
            findgofcEmbed
                .setColor(msg.member.displayHexColor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle('**Friend Code Found**')
                .setDescription(stripIndents`**Name**
                    ${name}
                    **Nickname**
                    ${nickname}
                    **Friend Code**
                    ${friendcode}`);
            return msg.channel.send(findgofcEmbed);
        }
    } catch (err) {
        msg.channel.send("An error occurred!")
    }
  }
};