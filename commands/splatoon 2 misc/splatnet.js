const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
const request = require('request');

module.exports = class SplatnetCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'splatnet',
            aliases: ['net'],
            group: 'splatoon 2 misc',
            memberName: 'splatnet',
            description: 'Displays information about the current gear on SplatNet 2',
            examples: ['splatnet 1', 'net 2'],
            args: [
                {
                    key: 'number',
                    prompt: 'What gear number do you want to view information on? You can choose 1 through 6.',
                    type: 'integer'
                }
            ]
        });
    }

    run(msg, { number }) {
        // get splatfest info for all 3 regions
	    request('https://splatoon2.ink/data/merchandises.json', function (error, response, body) {
            body = JSON.parse(body);

            var numbers = [1, 2, 3, 4, 5, 6];
            var confirm = numbers.indexOf(number);
            var gearNumber, gearBrandName, gearName, gearKind, gearPrice,
                gearSkill, gearOriginalSkill, gearOriginalPrice, gearExpires,
                gearExpiresTime, url;

            if (confirm === -1) {
                msg.channel.send("Please choose a number between 1 and 6!");
            } else {
                switch (number) {
                    case 1:
                        gearNumber = 0;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet1 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true)
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet1);
                        break;
                    case 2:
                        gearNumber = 1;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet2 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true) 
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet2);
                        break;
                    case 3:
                        gearNumber = 2;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet3 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName, true)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true)
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet3);
                        break;
                    case 4:
                        gearNumber = 3;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet4 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true)
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet4);
                        break;
                    case 5:
                        gearNumber = 4;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet5 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true)
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet5);
                        break;
                    case 6:
                        gearNumber = 5;
                        gearBrandName = body.merchandises[gearNumber].gear.brand.name;
                        gearName = body.merchandises[gearNumber].gear.name;
                        gearKind = body.merchandises[gearNumber].gear.kind;
                        gearPrice = body.merchandises[gearNumber].price;
                        gearSkill = body.merchandises[gearNumber].skill.name;
                        if(body.merchandises[gearNumber].original_gear === null)
                        {
                            gearOriginalSkill = "N/A";
                            gearOriginalPrice = "N/A";
                        } else {
                            gearOriginalSkill = body.merchandises[gearNumber].original_gear.skill.name;
                            gearOriginalPrice = body.merchandises[gearNumber].original_gear.price;
                        }
                        gearExpires = body.merchandises[gearNumber].end_time;
                        gearExpiresTime = moment(moment.unix(gearExpires).toDate()).format("MM-DD-YYYY HH:mm")
                        url = "https://splatoon2.ink/assets/splatnet" + body.merchandises[gearNumber].gear.image
                        // display embeded information from SplatNet 2
                        const embedSplatNet6 = new MessageEmbed()
                            .setTitle("SplatNet Gear #" + number)
                            .setColor(9442302)
                            .setImage("https://splatoon.nintendo.com/assets/img/online-service/logo-splatnet_2x.png")
                            .setThumbnail(url)
                            .addField("Gear Name:", gearName)
                            .addField("Gear Brand:", gearBrandName, true)
                            .addField("Gear Kind:", gearKind, true)
                            .addField("Gear Price:", gearPrice, true)
                            .addField("Gear Skill:", gearSkill, true)
                            .addField("Original Gear Skill:", gearOriginalSkill, true)
                            .addField("Original Gear Price:", gearOriginalPrice, true)
                            .addField("Expires:", `${gearExpiresTime}`)
                            .setFooter("Data obtained from splatoon2.ink");
                        msg.channel.send(embedSplatNet6);
                        break;
                }
            }
        })
    }
};