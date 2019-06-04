const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class Rule4Command extends Command {
  constructor (client) {
    super(client, {
      name: 'r4',
      aliases: ['rule4'],
      group: 'rules',
      memberName: 'r4',
      description: 'Replies with the fourth rule of the server',
      examples: ['r4'],
      guildOnly: true
    });
  }

  run (msg) {
    const r4Embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Rule 4', 'The only type of advertising we allow on this server is art, writing and other creative works in <#584930165612740609>. If you have something else you\'d like to advertise, you can do that ONLY in this forum thread: [http://www.pokemoncrossroads.com/forum/showthread.php?1386-Website-Forum-Advertising](http://www.pokemoncrossroads.com/forum/showthread.php?1386-Website-Forum-Advertising)')
    return msg.channel.send(r4Embed);
  }
};