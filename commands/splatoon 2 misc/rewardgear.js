const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
const request = require('request');

module.exports = class RewardGearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rewardgear',
            group: 'splatoon 2 misc',
            aliases: ['gear'],
            memberName: 'rewardgear',
            description: 'Replies with the current month\s Salmon Run Gear',
            examples: ['rewardgear', 'gear']
        });
    }

    run(msg) {
        const gearEmbed = new MessageEmbed();
        request('https://splatoon2.ink/data/timeline.json', function(error, response, body) {
			    // parse the JSON
			    body = JSON.parse(body);
			
			    // get the reward gear
                var rewardGear = body.coop.reward_gear.gear.name;
                var rewardRarity = body.coop.reward_gear.gear.rarity;
                var rewardKind = body.coop.reward_gear.gear.kind;
                var rewardBrand = body.coop.reward_gear.gear.brand.name;
                var rewardImage = 'https://app.splatoon2.nintendo.net' + body.coop.reward_gear.gear.image;
				
                // embed the Salmon Run info
                gearEmbed
				    .setTitle("Salmon Run Reward Info")
				    .setColor(msg.member.displayHexColor)
                    .setThumbnail("https://github.com/KunoichiZ/fuguri-bot/blob/master/images/logos/salmonrun.png?raw=true")
                    .setImage(rewardImage)
                    .addField("Reward:", rewardGear)
                    .addField("Reward Kind:", rewardKind)
                    .addField("Reward Rarity:", rewardRarity)
                    .addField("Reward Brand:", rewardBrand)
				    .setFooter("Data gathered from splatoon2.ink");
                msg.channel.send(gearEmbed);
            })
    }
};