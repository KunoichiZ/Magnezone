const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/databases/friendcodes.sqlite');
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

  async run (msg, { member }) {

    const name = member.user.tag;
    const findfcEmbed = new MessageEmbed();
    const nickname = member.displayName;
    
    try {
        if(await keyv.get(member.id) == null) {
            msg.channel.send("No Friend Code was added!");
        } else {
            keyv.on('error', err => console.error('Keyv connection error:', err));
            var friendcode = await keyv.get(member.id);

            findfcEmbed
                .setColor(msg.member.displayHexColor)
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