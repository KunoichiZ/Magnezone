const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/databases/gofriendcodes.sqlite');

module.exports = class AddGoFCCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'addgofc',
      group: 'friendcodes',
      memberName: 'addgofc',
      description: 'Adds the user\'s Pokemon Go friend code to the database',
      examples: ['addgofc 0123-4567-8910'],
      guildOnly: true,
      args: [
        {
            key: 'friendcode',
            prompt: 'What is your Pokemon Go friend code?',
            type: 'string'
        }
      ]
    });
  }

  async run (msg, { friendcode }) {
    const id = msg.member.id;
    const name = msg.member.user.tag;
    const nickname = msg.member.displayName;
    const addgofcEmbed = new MessageEmbed();
    
    try {
      if(await keyv.get(msg.member.id) == null) {
        keyv.on('error', err => console.error('Keyv connection error:', err));
        await keyv.set(id, friendcode);

        addgofcEmbed
          .setColor(msg.member.displayHexColor)
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setTitle('**New Friend Code Added**')
          .setDescription(`**Name**
              ${name}
              **Nickname**
              ${nickname}
              **Friend Code**
              ${friendcode}`);
          return msg.channel.send(addgofcEmbed);
      } else {
        msg.channel.send("You've already added a Pokemon Go Friend Code!");
      }
    } catch (err) {
        msg.channel.send("An error occurred!")
    }
  }
};