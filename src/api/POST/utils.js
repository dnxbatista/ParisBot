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
}

module.exports = {
    getBotGuilds,
}