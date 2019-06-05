const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Database = require('better-sqlite3');
const path = require('path');

module.exports = class AddFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'addfc',
      aliases: ['add'],
      group: 'switch',
      memberName: 'addfc',
      description: 'Adds the user\'s Nintendo Switch friend code to the database',
      examples: ['addfc SW-0123-4567-8910'],
      guildOnly: true,
      args: [
        {
            key: 'friendcode',
            prompt: 'What is your friend code?',
            type: 'string'
        }
      ]
    });
  }

  run (msg, { friendcode }) {
    const id = msg.member.id;
    const name = msg.member.user.tag;
    const addfcEmbed = new MessageEmbed();
    const conn = new Database(path.join(__dirname, '../../data/databases/friendcodes.sqlite3'));

    try {
        const { userID, userName, fc } = conn.prepare(`SELECT * FROM "${msg.guild.id}" WHERE id="${id}"`).get(msg.member.id);

        if(userID == "") {
            conn.prepare(`INSERT INTO "${msg.guild.id}" (id, name, friendcode) VALUES ($id, $name, $friendcode);`)
                .run({id, name, friendcode });

            addfcEmbed
                .setColor(msg.member.displayHexColor)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setTitle('**New Friend Code Added**')
                .setDescription(`**Name**
                    ${name}
                    **Friend Code**
                    ${friendcode}`);
            return msg.channel.send(addfcEmbed);
        } else {
            return msg.channel.send("You have already enetered your Nintendo Switch Friend Code!");
        }
    } catch (err) {
        if (/(?:no such table|Cannot destructure property)/i.test(err.toString())) {
            conn.prepare(`CREATE TABLE IF NOT EXISTS "${msg.guild.id}" (id TEXT PRIMARY KEY, name TEXT, friendcode TEXT);`).run();

            conn.prepare(`INSERT INTO "${msg.guild.id}" (id, name, friendcode) VALUES ($id, $name, $friendcode);`)
                .run({id, name, friendcode });

            addfcEmbed
                .setColor(msg.member.displayHexColor)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setTitle('**New Friend Code Added**')
                .setDescription(`**Name**
                    ${name}
                    **Friend Code**
                    ${friendcode}`);
            return msg.channel.send(addfcEmbed);
        }
        
    }
  }
};