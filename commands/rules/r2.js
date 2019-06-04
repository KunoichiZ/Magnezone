const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class Rule2Command extends Command {
  constructor (client) {
    super(client, {
      name: 'r2',
      aliases: ['rule2'],
      group: 'rules',
      memberName: 'r2',
      description: 'Replies with the second rule of the server',
      examples: ['r2'],
      guildOnly: true
    });
  }

  run (msg) {
    const r2Embed = new MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .addField('Rule 2', 'Please use appropriate channels. Using commands should happen in <#419672986669547540>, for example.')
    return msg.channel.send(r2Embed);
  }
};