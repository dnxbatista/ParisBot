const {
    Client,
    Guild,
} = require('discord.js');


/**
 * 
 * @param {Client} client 
 * @param {*} res 
 */
async function getBotGuilds(client, res)
{
    try {
        const bot_guilds = client.guilds.cache.map(guild => {
            return {
                name: guild.name,
                id: guild.id,
                icon: guild.icon,
                membersCount: guild.memberCount,
                ownerId: guild.ownerId     
            };
        });
    
        if(bot_guilds.length > 0) {
             res.status(200).json({bot_guilds});
        } else {
            res.status(404).json({sucess: false, message: 'No Servers Found'});
        }
    
        console.log('📞 | API - Function (getBotGuilds [POST] )')
    } catch (error) {
        res.status(404).json({sucess: false});
    }   
}

/**
 * 
 * @param {Client} client 
 * @param {*} res 
 */
async function get_guild_roles(client, guild_id, res)
{  
    try {
        //Get Infos
        const selected_guild = client.guilds.cache.get(guild_id);
        const guild_roles = selected_guild.roles.cache;

        res.status(200).json({guild_roles})

        console.log('📞 | API - Function (get_guild_roles [POST] )')
    } catch (error) {
        res.status(200).json({sucess: false});
        console.log(error);
    }   
}

/**
 * 
 * @param {Client} client 
 * @param {*} res 
 */
async function get_guild_channels(client, guild_id, res)
{  
    try {
        //Get Infos
        const selected_guild = client.guilds.cache.get(guild_id);
        const guild_channels = selected_guild.channels.cache

        res.status(200).json({guild_channels})

        console.log('📞 | API - Function (get_guild_channels [POST] )')
    } catch (error) {
        res.status(200).json({sucess: false});
        console.log(error);
    }   
}

module.exports = {
    getBotGuilds,
    get_guild_roles,
    get_guild_channels,
}