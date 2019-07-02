const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/databases/gofriendcodes.sqlite');
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

  async run (msg, { member }) {

    const name = member.user.tag;
    const findgofcEmbed = new MessageEmbed();
    const nickname = member.displayName;
    
    try {
        if(await keyv.get(member.id) == null) {
            msg.channel.send("No Friend Code was added!");
        } else {
            keyv.on('error', err => console.error('Keyv connection error:', err));
            var friendcode = await keyv.get(member.id);

            findgofcEmbed
                .setColor(msg.member.displayHexColor)
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