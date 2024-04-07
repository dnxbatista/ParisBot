const {  Client, Channel, Role, Guild, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const Guilds = require('../../schemas/Infos/guilds_schema');
const authoken = require('../../api/Auth/authoken');

/**
 * 
 * @param {Client} client 
 * @param {Role} role 
 */
async function set(client, button_name, role_id, channel_id, prefix_name, res)
{
    try {
        //Get Channel
        selected_channel = client.channels.cache.get(channel_id);

        //Create Embed
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Paris Bot",
            })
            .setTitle("👤 | Registrar")
            .setDescription("***Clique No Botao Abaixo Para Registra-se***")
            .setColor("#ffffff");

        //Create Button
        const button = new ButtonBuilder()
            .setCustomId(`01-${role_id}-${prefix_name}`)
            .setLabel(button_name)
            .setStyle(ButtonStyle.Primary);

        //Create Row
        const row = new ActionRowBuilder()
            .addComponents(button);

        //Send Button And Embed
        selected_channel.send({embeds: [embed], components: [row]});
        
        console.log('📞 | API - Command (/set [POST] )')
        res.status(200).json({sucess: true});
    } catch (error) {
        console.log(error);
    }
   
}

async function add_server(guild_name, guild_id, buyer_user_id, rent_expire_days, res)
{
    try {
        const msDays = rent_expire_days * 24 * 60 * 60 * 1000; //Days In Miliseconds

        //Check If Guild Already Exist's
        const guildName_DB = await Guilds.findOne({guild_name: guild_name});
        const guildID_DB = await Guilds.findOne({guild_id: guild_id});
        if(guildName_DB || guildID_DB) return res.status(404).json({sucess: false});

        //Create New Guild
        const newGuild = new Guilds({
            guild_name: guild_name,
            guild_id: guild_id,
            buyer_user_id: buyer_user_id,
            rent_expire_date: new Date(Date.now() + msDays),
        })
        await newGuild.save();

        //Create New User
        const newUser = await authoken.createNewUser(buyer_user_id);
        if(!newUser) return console.log("❌ | Error Creating User");

        //Log
        console.log('📞 | API - Command (/add-server [POST] )')
        console.log(`➕ | New Guild Has Been Added In The Database!`)
        res.status(200).json({sucess: true});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    //Server Commands
    set, 

    //Dev Commands
    add_server,
}