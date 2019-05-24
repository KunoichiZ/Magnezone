const { Command } = require('awesome-commando');
const Discord = require('awesome-djs');

module.exports = class GiveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'giverole',
            aliases: ['give'],
            group: 'roles',
            memberName: 'giverole',
            description: 'Gives the user either the Artist, Writer, GCEAer, ASBer, or the Role Player role.',
            examples: ['giverole Artist'],
            guildOnly: true,
            args: [
                {
                    key: 'role',
                    prompt: 'What role do you want to give yourself? You can choose from `Artist`, `Writer`, `GCEAer`, `ASBer` or `Role Player`.',
                    type: 'string'
                }
            ]
        });
    }

    /*hasPermission (msg) {
        return msg.member.hasPermission('MANAGE_ROLES');
    }*/

    run(msg, { role }) {
        
        //const foundMember = msg.guild.members.find(member => member.id === msg.author.id);

        
        /*const artistRole = msg.guild.roles.find("name", "Artist");
        const writerRole = msg.guild.roles.find("name", "Writer");
        const gceaerRole = msg.guild.roles.find("name", "GCEAer");
        const asberRole = msg.guild.roles.find("name", "ASBer");
        const roleplayerRole = msg.guild.roles.find("name", "Role Player");*/
                    
        if(role === "Artist") {
            const artistRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(artistRole.id)) {
               msg.channel.send("You already have the `Artist` role!");
            } else {
                msg.member.roles.add(artistRole).catch(console.error);
                msg.channel.send("You've been given the `Artist` role!");
            }
        } else if(role === "Writer") {
            const writerRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(writerRole.id)) {
                msg.channel.send("You already have the `Writer` role!");
            } else {
                msg.member.roles.add(writerRole).catch(console.error);
                msg.channel.send("You've been given the `Writer` role!");
            }
        } else if(role === "Role Player") {
            const roleplayerRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(roleplayerRole.id)) {
                msg.channel.send("You already have the `Role Player` role!");
            } else {
                msg.member.roles.add(roleplayerRole).catch(console.error);
                msg.channel.send("You've been given the `Role Player` role!");
            }
        } else if(role === "GCEAer") {
            const gceaerRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(gceaerRole.id)) {
                msg.channel.send("You already have the `GCEAer` role!");
            } else {
                msg.member.roles.add(gceaerRole).catch(console.error);
                msg.channel.send("You've been given the `GCEAer` role!");
            }
        } else if(role === "ASBer") {
            const asberRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(asbgerRole.id)) {
                msg.channel.send("You already have the `ASBer` role!");
            } else {
                msg.member.roles.add(asberRole).catch(console.error);
                msg.channel.send("You've been given the `ASBer` role!");
            }
        }
    }
};