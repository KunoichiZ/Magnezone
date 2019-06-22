const path = require('path');
const {Client, SQLiteProvider} = require('awesome-commando');
const sqlite = require('sqlite');

require('dotenv').config({path: path.join(__dirname, 'data/.env')});

const client = new Client({
  owner: '147800635046232064',
  commandPrefix: process.env.PREFIX,
  disableEveryone: true,
  unknownCommandResponse: false,
  selfbot: false,
  presence: {
    status: 'online',
    activity: {
        name: '@Officer Magnezone help',
        type: 'WATCHING',
    }
  }
});

sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((db) => {
  client.setProvider(new SQLiteProvider(db));
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['currency', 'Currency Commands'],
    ['friendcodes', 'Friend Code Commands'],
    ['info', 'Information Commands'],
    ['misc', 'Misc Commands'],
    ['moderation', 'Moderation Commands'],
    ['owner', 'Owner Commands'],
    ['pokemon', 'Pokemon Commands'],
    ['roles', 'Role Commands'],
    ['rules', 'Rules Commands'],
    ['splatoon 2 misc', 'Splatoon 2 Misc Commands'],
    ['splatoon 2 modes', 'Splatoon 2 Modes Commands'],
    ['switch', 'Nintendo Switch Commands'],
    ['test', 'Test Commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: true,
    prefix: true,
    ping: true,
    eval_: true,
    commandState: true
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log('Logged in!');
});

client.on('guildMemberAdd', member => {
  const role = member.guild.roles.find(role => role.name === 'Members');
  member.roles.add(role);
});
 
client.on('error', console.error);


client.login(process.env.TOKEN);