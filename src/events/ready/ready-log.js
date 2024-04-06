const { Client, Guild } = require('discord.js')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
  console.log(`✔️ | ${client.user.tag} Is Online!`);
}
