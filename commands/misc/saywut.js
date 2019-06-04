const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
        name: 'saywut',
        aliases: ['saywat'],
        group: 'misc',
        memberName: 'saywut',
        description: 'Shows who used the say command last',
        examples: ['saywut'],
        guildOnly: true,
        throttling: {
          usages: 2,
          duration: 10
        }
    });
  }

  run (msg) {
    // gets the data from the provider database
    const saycontents = this.client.provider.get(msg.guild.id, 'saydata', null);
    // console.log(saycontents)

    // delete the original message
    if (msg.deletable) {
         msg.delete();
    }

    // if the contents exist, embed the message
    if (saycontents) {
      const wutEmbed = new MessageEmbed()
        .setColor(saycontents.memberHexColor)
        .setTitle('Wrote')
        .setAuthor(`${saycontents.authorTag}`, saycontents.avatarURL)
        .setFooter(`Last ${saycontents.commandPrefix}say message author | ${moment(saycontents.messageDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, this.client.user.avatarURL)
        .setDescription(saycontents.argString);

      return msg.say(wutEmbed);
    }
    // if the contents don't exist, say that message can't be found
    msg.reply('Can\'t find the message');
    // return msg.delete();

    
  }
};