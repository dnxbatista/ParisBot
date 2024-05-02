const { Client, Channel, Role, Guild, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const Guilds = require('../../schemas/Infos/guilds_schema');
const { createNewUser } = require( '../../api/Auth/authoken');

/**
 * 
 * @param {Client} client 
 * @param {Role} role 
 */
async function set(client, buttonsData, discord_channel, res)
{
    try {
        //Get Channel
        const channel_a = client.channels.cache.get(discord_channel);

        //Converte JSON To Javascript Object
        const convertedData = JSON.parse(buttonsData);
        
        //Loop Throw The Buttons Information And Add Then To The Row
        const row = new ActionRowBuilder();
        convertedData.forEach((buttonInfo) => {
            if (buttonInfo.activated === false) return

            const btn = new ButtonBuilder()
                .setLabel(buttonInfo.name)
                .setCustomId(`01-${buttonInfo.role_1}-${buttonInfo.role_2}-${buttonInfo.prefix}-${buttonInfo.has_id}`)
                .setStyle(ButtonStyle.Primary);
            row.addComponents(btn);
            
            console.log(`Button ID: 01-${buttonInfo.role_1}-${buttonInfo.role_2}-${buttonInfo.prefix}-${buttonInfo.has_id}`);
        });   

        //Embed
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Paris Bot",
                iconURL: "https://cdn.discordapp.com/attachments/1007433140870066208/1232434262431629352/11a31e2354edd976851a4b60b672852c.png?ex=66297159&is=66281fd9&hm=d565d8616e91878e1ddb718d13cfc7165cb91d82dab3536d21dd5401abaa6b60&"
            })
            .setTitle("Registrar-se")
            .setDescription("Clique Em Uns Dos Botões Abaixo Para Registrar-se")
            .setColor("#ffffff")
            .setFooter({
                text: "Sistema Exclusivo |  Paris Bot"
            });


        //Message
        await channel_a.send({embeds: [embed],components: [row]});
        
        console.log('📞 | API - Command (/set [POST] )')
        res.status(200).json({sucess: true});
    } catch (error) {
        console.log(error);
        res.status(404).json({sucess: false});
    }  
}

async function add_server(guild_name, guild_id, buyer_user_id, rent_expire_days, res)
{
    try {
        const msDays = rent_expire_days * 24 * 60 * 60 * 1000; //Days In Miliseconds

        //Check If Guild Already Exist's
        const guildName_DB = await findOne({guild_name: guild_name});
        const guildID_DB = await findOne({guild_id: guild_id});
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
        const newUser = await createNewUser(buyer_user_id);
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