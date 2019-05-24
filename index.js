const path = require('path');
const {Client, SQLiteProvider} = require('awesome-commando');
const sqlite = require('sqlite');

require('dotenv').config({path: path.join(__dirname, 'data/.env')});

const client = new Client({
  owner: '147800635046232064',
  commandPrefix: process.env.prefix,
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
    ['moderation', 'Moderation Commands'],
    ['owner', 'Owner Commands'],
    ['roles', 'Role Commands'],
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
 
client.on('error', console.error);


client.login(process.env.TOKEN);