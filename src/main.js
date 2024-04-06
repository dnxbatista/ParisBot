//Normal Imports
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

//Api Imports
const { set, add_server } = require('./api/POST/Commands');
const { getBotGuilds, get_guild_roles, get_guild_channels } = require('./api/POST/utils')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildWebhooks,
  ],
});

//Handle Out Folders: [ Commands / Events ] Folders
eventHandler(client);

// Connecting To The API (Using Express)
const app = express();
const PORT = 3000;

// Use body-parser to parse the request data
app.use(express.urlencoded({extended: true}));
app.listen(PORT, () => console.log(`✔️ | API Connected! PORT: ${PORT}`));

//Api Requests [ Commands ]
app.post('/api/commands/set', async (req, res) => {
  const { button_name, role_id, channel_id, prefix_name} = await req.body;
  await set(client, button_name ,role_id,  channel_id, prefix_name, res);
});

app.post('/api/commands/add-server', async (req, res) => {
  try {
    const { guild_name, guild_id, buyer_user_id, rent_expire_date } = await req.body;
    await add_server(guild_name,guild_id,buyer_user_id,rent_expire_date,res);
  } catch (error) {
    res.status(404).json({sucess: false})
    console.log(error)
  }
  
});

//Api Requests [ Bot ]
app.post('/api/bot/get-guilds', async (req, res) => {
  await getBotGuilds(client, res);
});

app.post('/api/guild/get-roles', async (req, res) => {
  try {
    const { guild_id } = await req.body;
    await get_guild_roles(client, guild_id, res);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/guild/get-channels', async (req, res) => {
  try {
    const { guild_id } = await req.body;
    await get_guild_channels(client, guild_id, res);
  } catch (error) {
    console.log(error);
  }
});

// Connecting To The DataBase (MongoDB)
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✔️ | Connected To The DataBase');
  } catch (error) {
    console.log(`❌ | There Is A Error To Connected The Bot To The Database\n\n${error}`);
  }
})();

client.login(process.env.TOKEN);
