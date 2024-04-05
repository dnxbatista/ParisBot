const {  
    Client,
    Channel,
    Role,
    Guild
 } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Role} role 
 */
async function set(client, server_ID, role_id, role_name, channel_ID, res)
{
    console.log(`Server ID: ${server_ID}.\nRole Name: ${role_name}.\nChannel ID: ${channel_ID}`);
    selected_channel = client.channels.cache.get(channel_ID);
    await selected_channel.send("Hello From API!");
    res.status(200).json({sucess: true, message: "Command Sended"});
}

async function add_server(guild_name, guild_id, buyer_user_id, rent_expire_date)
{
    return 0;
}

module.exports = {
    //Server Commands
    set, 

    //Dev Commands
    add_server,
}