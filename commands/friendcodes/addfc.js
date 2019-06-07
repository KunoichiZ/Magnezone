const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/databases/friendcodes.sqlite');

module.exports = class AddFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'addfc',
      aliases: ['add'],
      group: 'friendcodes',
      memberName: 'addfc',
      description: 'Adds the user\'s Nintendo Switch friend code to the database',
      examples: ['addfc SW-0123-4567-8910'],
      guildOnly: true,
      args: [
        {
            key: 'friendcode',
            prompt: 'What is your Nintendo Switch friend code?',
            type: 'string'
        }
      ]
    });
  }

  async run (msg, { friendcode }) {
    const id = msg.member.id;
    const name = msg.member.user.tag;
    const nickname = msg.member.displayName;
    const addfcEmbed = new MessageEmbed();
    
    try {
      if(await keyv.get(msg.member.id) == null) {
        keyv.on('error', err => console.error('Keyv connection error:', err));
        await keyv.set(id, friendcode);

        addfcEmbed
          .setColor(msg.member.displayHexColor)
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setTitle('**New Friend Code Added**')
          .setDescription(`**Name**
              ${name}
              **Nickname**
              ${nickname}
              **Friend Code**
              ${friendcode}`);
          return msg.channel.send(addfcEmbed);
      } else {
        msg.channel.send("You've already added a Nintendo Switch Friend Code!");
      }
    } catch (err) {
        msg.channel.send("An error occurred!")
    }
  }
};