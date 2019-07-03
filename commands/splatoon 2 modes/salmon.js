const { Command } = require('awesome-commando');
const { MessageEmbed } = require('awesome-djs');
const moment = require('moment');
const request = require('request');

module.exports = class SalmonRunCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'salmonrun',
            aliases: ['sal', 'grizzco', 'coop', 'salmon'],
            group: 'splatoon 2 modes',
            memberName: 'salmonrun',
            description: 'Displays the current and next active times, map, and weapons for Salmon Run.',
            examples: ['salmonrun']
        });
    }

    run(msg) {
        // get league maps, modes, and times
	    request('https://splatoon2.ink/data/coop-schedules.json', function (error, response, body) {
		    // parse the JSON	
		    body = JSON.parse(body);
			
		    // obtain the current & next maps and weapons
		    var nowStage = body.details[0].stage.name;
		    var nextStage = body.details[1].stage.name;
		    var nowWeapons = [];
		    nowWeapons.push(body.details[0].weapons[0].weapon.name);
		    nowWeapons.push(body.details[0].weapons[1].weapon.name);
		    nowWeapons.push(body.details[0].weapons[2].weapon.name);
		    nowWeapons.push(body.details[0].weapons[3].weapon.name);
		    var nextWeapons = [];
		    nextWeapons.push(body.details[1].weapons[0].weapon.name);
		    nextWeapons.push(body.details[1].weapons[1].weapon.name);
		    nextWeapons.push(body.details[1].weapons[2].weapon.name);
		    nextWeapons.push(body.details[1].weapons[3].weapon.name);

		    // get salmon run times and convert them to the proper date and times
		    var nowSalmonMapStarts = moment(moment.unix(body.schedules[0].start_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nowSalmonMapEnds = moment(moment.unix(body.schedules[0].end_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nextSalmonMapStarts = moment(moment.unix(body.schedules[1].start_time).toDate()).format("MM-DD-YYYY HH:mm")
		    var nextSalmonMapEnds = moment(moment.unix(body.schedules[1].end_time).toDate()).format("MM-DD-YYYY HH:mm")
				
			// embed the Salmon Run info
			const salmonEmbed = new MessageEmbed()
			    .setTitle("Salmon Run Schedule")
			    .setColor(11545691)
			    .setThumbnail("https://github.com/KunoichiZ/fuguri-bot/blob/master/images/logos/salmonrun.png?raw=true")
			    .addField("Next active times:", `${nowSalmonMapStarts} through ${nowSalmonMapEnds}`)
			    .addField("Map:", nowStage)
			    .addField("Weapons:", nowWeapons[0] + ", " + nowWeapons[1] + ", " + nowWeapons[2] + ", " + nowWeapons[3])
			    .addField("Next active times:", `${nextSalmonMapStarts} through ${nextSalmonMapEnds}`)
			    .addField("Next map:", nextStage)
			    .addField("Next weapons:", nextWeapons[0] + ", " + nextWeapons[1] + ", " + nextWeapons[2] + ", " + nextWeapons[3])
			    .setFooter("Data gathered from splatoon2.ink");
            msg.channel.send(salmonEmbed);
        })
    }
};