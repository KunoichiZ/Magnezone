const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class GiveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'giverole',
            aliases: ['give'],
            group: 'roles',
            memberName: 'giverole',
            description: 'Gives the user either the Writer, Artist, GCEA, RPer, Musician, Showdown, ASBer, or SwSh Spoilers role',
            examples: ['giverole Artist'],
            guildOnly: true,
            args: [
                {
                    key: 'role',
                    prompt: 'What role do you want to give yourself? You can choose from `Writer`, `Artist`, `GCEAer`, `Role Player`, `Musician`, `Showdown Player`, `ASBer`, `SwSh Spoilers`',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { role }) {
                    
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
            if(msg.member.roles.has(asberRole.id)) {
                msg.channel.send("You already have the `ASBer` role!");
            } else {
                msg.member.roles.add(asberRole).catch(console.error);
                msg.channel.send("You've been given the `ASBer` role!");
            }
        } else if(role === "Musician") {
            const musicianRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(musicianRole.id)) {
                msg.channel.send("You already have the `Musician` role!");
            } else {
                msg.member.roles.add(musicianRole).catch(console.error);
                msg.channel.send("You've been given the `Musician` role!");
            }
        } else if(role === "Showdown Player") {
            const showdownRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(showdownRole.id)) {
                msg.channel.send("You already have the `Showdown Player` role!");
            } else {
                msg.member.roles.add(showdownRole).catch(console.error);
                msg.channel.send("You've been given the `Showdown Player` role!");
            }
        } else if(role === "SwSh Spoilers") {
            const swshRole = msg.guild.roles.find(roles => roles.name === role);
            if(msg.member.roles.has(swshRole.id)) {
                msg.channel.send("You already have the `SwSh Spoilers` role!");
            } else {
                msg.member.roles.add(swshRole).catch(console.error);
                msg.channel.send("You've been given the `SwSh Spoilers` role!");
            }
        } 
    }
};