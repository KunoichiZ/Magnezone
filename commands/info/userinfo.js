const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
require('moment-duration-format');

module.exports = class UserInfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      group: 'info',
      memberName: 'userinfo',
      aliases: ['user', 'info', 'uinfo'],
      description: 'Displays information about a specific user.',
      examples: ['userinfo AinoMinako'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: 'member',
          prompt: 'What user would you like get information on?',
          type: 'member',
          default: msg => msg.member
        }
      ]
    });
  }

  arrayClean (deleteValue, array) {
    for (let val in array) {
      if (array[val] === deleteValue) {
        array.splice(val, 1);
        val -= 1;
      }
    }
  
    return array;
  }

  run (msg, { member }) {
    const tag = member.user.tag;
    const username = member.user.username;
    const roles = member.roles.size > 1 ? this.arrayClean(null, member.roles.map((r) => {
      if (r.name !== '@everyone') {
        return r.name;
      }

      return null;
    })).join(' | ') : 'None';
    let joinedDiscord = null,
      joinedServer = null;
    const nickname = member.nickname;
    const activity = member.presence.activity;
    const color = member.displayHexColor;
    const avatar = member.user.displayAvatarURL({format: 'png'});

    joinedDiscord = moment(member.user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
    joinedServer = moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

    if (activity === null) {
        const uinfoEmbed = new MessageEmbed()
          .setAuthor(tag)
          .setThumbnail(avatar)
          .setColor(color)
          .addField('Name', username, true)
          .addField('Nickname', nickname ? nickname : 'No Nickname', true)
          .addField('Activity', 'Nothing', true)
          .addField('Roles', roles, true)
          .addField('Joined Discord', joinedDiscord)
          .addField('Joined Server', joinedServer);
  
        msg.channel.send(uinfoEmbed);
      } else {
        const activityName = member.presence.activity.name;
        const activityType = member.presence.activity.type;
        const uinfoEmbed = new MessageEmbed()
          .setAuthor(tag)
          .setThumbnail(avatar)
          .setColor(color)
          .addField('Name', username, true)
          .addField('Nickname', nickname ? nickname : 'No Nickname', true)
          .addField('Activity', `${activityType}: ${activityName}`, true)
          .addField('Roles', roles, true)
          .addField('Joined Discord', joinedDiscord)
          .addField('Joined Server', joinedServer);
  
        msg.channel.send(uinfoEmbed);
      }
  }
};