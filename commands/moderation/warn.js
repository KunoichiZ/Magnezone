const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const Database = require('better-sqlite3');
const path = require('path');

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'warn',
      aliases: ['w'],
      group: 'moderation',
      memberName: 'warn',
      description: 'Warns the selected member with the desired points',
      examples: ['warn AinoAlt 1 annoying'],
      userPermissions: ['BAN_MEMBERS'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3,
      },
      args: [
        {
            key: 'member',
            prompt: 'Which member should I give a warning?',
            type: 'member'
        },
        {
            key: 'points',
            prompt: 'How many warning points should I give this member?',
            type: 'integer'
        },
        {
            key: 'reason',
            prompt: 'What is the reason for this warning?',
            type: 'string',
            default: ''
        }
    ]
    });
  }

  run (msg, { member, points, reason }) {
    // mod-logs ID: 585656872355364864
    const conn = new Database(path.join(__dirname, '../../data/databases/warnings.sqlite3'));
    const warnEmbed = new MessageEmbed();

    warnEmbed
        .setColor(msg.member.displayHexColor)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setTimestamp();

    try {
      const query = conn.prepare(`SELECT points FROM "${msg.guild.id}" WHERE id = ?;`).get(member.id);
      let newPoints = points;
      let previousPoints = null;

      if (query) {
          previousPoints = query.points;
          newPoints += query.points;
          conn.prepare(`UPDATE "${msg.guild.id}" SET points=$points WHERE id="${member.id}";`)
              .run({ points: newPoints });
      } else {
          previousPoints = 0;
          conn.prepare(`INSERT INTO "${msg.guild.id}" VALUES ($id, $tag, $points);`)
              .run({ points, id: member.id, tag: member.user.tag });
      }

      warnEmbed.setDescription(`**Member:** ${member.user.tag} (${member.id})\n
          **Action:** Warn
          **Previous Warning Points:** ${previousPoints}\n
          **Current Warning Points:** ${newPoints}\n
          **Reason:** ${reason !== '' ? reason : 'No reason has been added by the moderator'}`);

      if (msg.guild.settings.get('mod-logs', true)) {
        const modlogsChannel = this.client.channels.get('585656872355364864');
        modlogsChannel.send(warnEmbed);
      }

      if (msg.deletable) {
        msg.delete();
      }

      return msg.channel.send(warnEmbed);
    } catch (err) {
          if (/(?:no such table|Cannot destructure property)/i.test(err.toString())) {
              conn.prepare(`CREATE TABLE IF NOT EXISTS "${msg.guild.id}" (id TEXT PRIMARY KEY, tag TEXT, points INTEGER);`)
                  .run();

              conn.prepare(`INSERT INTO "${msg.guild.id}" VALUES ($id, $tag, $points);`)
                  .run({
                      points,
                      id: member.id,
                      tag: member.user.tag,
                  });
              } 
      }
      warnEmbed.setDescription(`**Member:** ${member.user.tag} (${member.id})\n
          **Action:** Warn\m
          **Previous Warning Points:** 0\n
          **Current Warning Points:** ${points}\n
          **Reason:** ${reason !== '' ? reason : 'No reason has been added by the moderator'}`);

      if (msg.deletable) {
        msg.delete();
      }
      
      if(points === 3) {
        const banEmbed = new MessageEmbed();
        banEmbed 
          .setColor(msg.member.displayHexColor)
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setTimestamp()
          .setDescription('Sorry, you have accumulated 3 warn points. You are now banned from the server');

          member.ban(reason = 'Accumulated 3 warn points');
          msg.channel.send(banEmbed);
          const modlogsChannel = this.client.channels.get('585656872355364864');
          modlogsChannel.send(banEmbed);
      }

      return msg.channel.send(warnEmbed);
  }
};