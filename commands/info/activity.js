const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ActivityCommand extends Command {
    constructor (client) {
      super(client, {
        name: 'activity',
        aliases: ['presence'],
        group: 'info',
        memberName: 'activity',
        description: 'Displays the activity of a specific user',
        examples: ['activity AinoMinako'],
        guildOnly: true,
        args: [
            {
                key: 'member',
                prompt: 'What user would you like to view the activity of?',
                type: 'member'
            }
        ]
      });
    }
  
    run (msg, { member }) {
      const tag = member.user.tag;
      const activity = member.presence.activity;
  
      const avatar = member.user.displayAvatarURL({format: 'png'});
      const color = member.displayHexColor;
  
      // console.log(activityType + ": " + activityName)
      if (activity === null) {
        // console.log(member.presence.activity.name)
        console.log(member.presence);
        const activityEmbed = new MessageEmbed()
          .setAuthor(tag)
          .setColor(color)
          .setThumbnail(avatar)
          .addField('Activity', 'Nothing');
  
        return msg.channel.send(activityEmbed);
      }
      const activityName = activity.name;
      const activityType = activity.type;
      // console.log(member.presence.activity.name)
  
      console.log(member.presence);
      const activityEmbed = new MessageEmbed()
        .setAuthor(tag)
        .setColor(color)
        .setThumbnail(avatar)
        .addField('Activity', `${activityType}: ${activityName}`, true);
  
      return msg.channel.send(activityEmbed);
    }
  };