const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const request = require('request');

module.exports = class TurfWarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'turf',
            aliases: ['reg', 'regular', 'turfwar'],
            group: 'splatoon 2 modes',
            memberName: 'turf',
            description: 'Displays the current and next Turf War stages.',
            examples: ['turf']
        });
    }

    run(msg) {
        // get ranked maps, modes, and times
	    request('https://splatoon2.ink/data/schedules.json', function (error, response, body) {
		    // parse the JSON
		    body = JSON.parse(body);

		    // get turf war maps
		    var nowTurfMap1 = body.regular[0].stage_a.name;
		    var nowTurfMap2 = body.regular[0].stage_b.name;
		    var nextTurfMap1 = body.regular[1].stage_a.name;
		    var nextTurfMap2 = body.regular[1].stage_b.name;

		    // get the times when the maps change and convert to proper date and time
		    var nowTurfMapEnds = moment(moment.unix(body.regular[0].end_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nextTurfMapEnds = moment(moment.unix(body.regular[1].end_time).toDate()).format("MM-DD-YYYY HH:mm")
			
		    // embed turf war information
		    const turfEmbed = new MessageEmbed()
			    .setTitle("Turf War Maps")
			    .setColor(13751592)
			    .setThumbnail("https://github.com/KunoichiZ/fuguri-bot/blob/master/images/logos/turf%20war.png?raw=true")
			    .addField("Maps:", nowTurfMap1 + ", " + nowTurfMap2)
			    .addField("Maps Change:", `${nowTurfMapEnds}`)
			    .addField("Next maps:", nextTurfMap1 + ", " + nextTurfMap2)
			    .addField("Maps Change:", `${nextTurfMapEnds}`)
			    .setFooter("Data gathered from splatoon2.ink");
		    msg.channel.send(turfEmbed);
        })
    }
};