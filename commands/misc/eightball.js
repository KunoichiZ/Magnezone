const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const eightball = require('eightball');

module.exports = class EightballCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eightball',
            group: 'misc',
            aliases: ['8ball'],
            memberName: 'eightball',
            description: 'Ask the eightball a question, get a random response.',
            examples: ['eightball'],
            guildOnly: true,
            args: [
                {
                    key: 'question',
                    prompt: 'What do you want to ask the 8ball?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { question }) {
        const eightballEmbed = new MessageEmbed()
            .setColor(msg.member.displayHexColor)
            .addField(msg.author.tag + " asked", question)
            .addField(":8ball:'s response", eightball())
        return msg.channel.send(eightballEmbed);
    }
};