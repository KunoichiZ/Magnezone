const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const { stripIndents } = require('common-tags');

module.exports = class ChangelogCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'changelog',
      group: 'info',
      aliases: ['cl', 'log'],
      memberName: 'changelog',
      description: 'Displays the changelog',
      examples: ['changelog'],
      guildOnly: true
    });
  }

  run (msg) {
    const changelogEmbed = new MessageEmbed();
    changelogEmbed
        .setColor('#11806a')
        .setAuthor(`${this.client.user.username}'s changelog`)
        .setDescription(stripIndents`
        **Recently Added Commands:** \n%coinflip, %fortune`);
    
    return msg.channel.send(changelogEmbed);
  }
};