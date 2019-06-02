const path = require('path');
const {Client, SQLiteProvider} = require('awesome-commando');
const sqlite = require('sqlite');

require('dotenv').config({path: path.join(__dirname, 'data/.env')});

const client = new Client({
  owner: '147800635046232064',
  commandPrefix: process.env.PREFIX,
  disableEveryone: true,
  unknownCommandResponse: false,
  selfbot: false
});

sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((db) => {
  client.setProvider(new SQLiteProvider(db));
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['info', 'Information Commands'],
    ['misc', 'Misc Commands'],
    ['moderation', 'Moderation Commands'],
    ['owner', 'Owner Commands'],
    ['pokemon', 'Pokemon Commands'],
    ['roles', 'Role Commands'],
    ['rules', 'Rules Commands'],
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
  // Don't know the role id?
  const role = member.guild.roles.find(role => role.name === 'Members');
  member.roles.add(role);
});
 
client.on('error', console.error);


client.login(process.env.TOKEN);