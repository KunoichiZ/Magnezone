const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
const request = require('request');

module.exports = class RankedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ranked',
            aliases: ['rank', 'gachi'],
            group: 'splatoon 2 modes',
            memberName: 'ranked',
            description: 'Displays the current and next Ranked Battle modes and stages.',
            examples: ['ranked']
        });
    }

    run(msg) {
        // get ranked maps, modes, and times
	    request('https://splatoon2.ink/data/schedules.json', function (error, response, body) {
		    // parse the JSON
		    body = JSON.parse(body);

		    // obtain the current and next ranked battle maps and modes
		    var nowRankedMap1 = body.gachi[0].stage_a.name;
		    var nowRankedMap2 = body.gachi[0].stage_b.name;
		    var nowRankedGameMode = body.gachi[0].rule.name;
		    var nextRankedMap1 = body.gachi[1].stage_a.name;
		    var nextRankedMap2 = body.gachi[1].stage_b.name;
		    var nextRankedGameMode = body.gachi[1].rule.name;

		    // obtain the times the maps change and convert them to proper date and times
		    var nowRankedMapEnds = moment(moment.unix(body.gachi[0].end_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nextRankedMapEnds = moment(moment.unix(body.gachi[1].end_time).toDate()).format("MM-DD-YYYY HH:mm")

		    // embed Ranked Mode information
		    const rankedEmbed = new Discord.MessageEmbed()
			    .setTitle("Ranked Maps")
			    .setColor(16731136)
			    .setThumbnail("https://github.com/KunoichiZ/fuguri-bot/blob/master/images/logos/ranked.png?raw=true")
			    .addField("Game Mode:", nowRankedGameMode)
			    .addField("Maps:", nowRankedMap1 + ", " + nowRankedMap2)
			    .addField("Maps Change:", `${nowRankedMapEnds}`)
			    .addField("Next game mode:", nextRankedGameMode)
			    .addField("Next maps:", nextRankedMap1 + ", " + nextRankedMap2)
			    .addField("Maps Change:", `${nextRankedMapEnds}`)
			    .setFooter("Data gathered from splatoon2.ink");
		    msg.channel.send(rankedEmbed);
        })
    }
};