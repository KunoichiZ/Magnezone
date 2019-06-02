const {Command} = require('awesome-commando');
const MessageEmbed = require('awesome-djs');
const moment = require('moment');

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'server',
      group: 'info',
      memberName: 'server',
      description: 'Replies with information about the server',
      examples: ['server']
    });
  }

  run (msg) {
    const serverEmbed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Server Name', msg.guild.name, true)
        .addField('Members', msg.guild.memberCount, true)
        .addField('Created At', moment(msg.guild.createdTimestamp).format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z'), false)
        

    return msg.channel.send(serverEmbed);
  }
};