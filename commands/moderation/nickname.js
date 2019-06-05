const {Command} = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');

module.exports = class NicknameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nickname',
      aliases: ['nick', 'n'],
      group: 'moderation',
      memberName: 'nickname',
      description: 'Nicknames the selected member with the provided nickname',
      examples: ['nickname AinoAlt KaoruAlt'],
      userPermissions: ['MANAGE_NICKNAMES'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member do you want to change the nickname of?',
            type: 'member'
        },
        {
            key: 'nickname',
            prompt: 'What name do you want to change their nickname to?',
            type: 'string'
        }
    ]
    });
  }

  run (msg, { member, nickname }) {
    const modlogsChannel = this.client.channels.get('585656872355364864');
    const oldName = member.displayName;
    const nicknameEmbed = new MessageEmbed();

    member.setNickname(nickname);

    nicknameEmbed
      .setColor(msg.member.displayHexColor)
      .setDescription(`**Action:** Nickname change\n
        **Member:** <@${member.id}> (${member.user.tag})\n
        **Old name:** ${oldName}\n
        **New name:** ${nickname}\n`);

    if (msg.deletable) {
        msg.delete();
    }

    modlogsChannel.send(nicknameEmbed);
  }
};