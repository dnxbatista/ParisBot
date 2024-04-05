//Normal Imports
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

//Api Imports
const { set } = require('./api/POST/Commands');
const { getBotGuilds } = require('./api/POST/utils')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildWebhooks,
  ],
});

eventHandler(client);

// Connecting To The API (Using Express)
const app = express();
const PORT = 3000;

// Use body-parser to parse the request data
app.use(express.urlencoded({extended: true}));
app.listen(PORT, () => console.log(`✔️ | API Connected! PORT: ${PORT}`));

//Api Requests
app.post('/api/commands/set', async (req, res) => {
  const { guild_id, role_id, role_name, channel_id} = await req.body;
  await set(client, guild_id, role_id, role_name, channel_id, res);
});

app.post('/api/bot/get-guilds', async (req, res) => {
  await getBotGuilds(client, res);
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
