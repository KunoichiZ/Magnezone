const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
const request = require('request');

module.exports = class LeagueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'league',
            aliases: ['l', 'group', 'squad'],
            group: 'splatoon 2 modes',
            memberName: 'league',
            description: 'Displays the current and next League Battle modes and stages.',
            examples: ['league']
        });
    }

    run(msg) {
        // get league maps, modes, and times
	    request('https://splatoon2.ink/data/schedules.json', function (error, response, body) {
		    // parse the JSON
		    body = JSON.parse(body);

		    // obtain the current and next league battle maps and modes
		    var nowLeagueMap1 = body.league[0].stage_a.name;
		    var nowLeagueMap2 = body.league[0].stage_b.name;
		    var nowLeagueGameMode = body.league[0].rule.name;
		    var nextLeagueMap1 = body.league[1].stage_a.name;
		    var nextLeagueMap2 = body.league[1].stage_b.name;
		    var nextLeagueGameMode = body.league[1].rule.name;

		    // obtain the times the maps change and convert them to proper date and times
		    var nowLeagueMapEnds = moment(moment.unix(body.league[0].end_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nextLeagueMapEnds = moment(moment.unix(body.league[1].end_time).toDate()).format("MM-DD-YYYY HH:mm")
			
		    // embed League Battle information
		    const leagueEmbed = new Discord.MessageEmbed()
			    .setTitle("League Maps")
			    .setColor(11545691)
			    .setThumbnail("https://github.com/KunoichiZ/fuguri-bot/blob/master/images/logos/league.png?raw=true")
			    .addField("Game Mode: ", nowLeagueGameMode)
			    .addField("Maps:", nowLeagueMap1 + ", " + nowLeagueMap2)
			    .addField("Maps Change:", `${nowLeagueMapEnds}`)
			    .addField("Next game mode:", nextLeagueGameMode)
			    .addField("Next maps:", nextLeagueMap1 + ", " + nextLeagueMap2)
			    .addField("Maps Change:", `${nextLeagueMapEnds}`)
			    .setFooter("Data gathered from splatoon2.ink");
            msg.channel.send(leagueEmbed);
        })
    }
};