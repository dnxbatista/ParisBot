const { Client, Interaction } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    try {
        //Interaction Type Check
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId.split("-")[0] === "021" || interaction.customId.split("-")[0] === "020")
        {

            // Get Command Params
            const role_1 = await interaction.customId.split("-")[1];
            const role_2 = await interaction.customId.split("-")[2];
            const prefix = await interaction.customId.split("-")[3];
            var has_id = false

            // Set Has_ID
            if(interaction.customId.split("-")[0] === "021"){
                has_id = true
            } else {
                has_id = false
            }

            // Get Modal Inputs
            const register_name = await interaction.fields.getTextInputValue('register_name');
            var register_id = null
            if(has_id){
                register_id = await interaction.fields.getTextInputValue('register_id');
            }

            //Set Nickname
            if(has_id){
                if(prefix != 0){
                    await interaction.member.setNickname(`${prefix} ${register_name} | ${register_id}`).catch(er => {console.log(`There is a error!!!\n${er}`)});
                } else {
                    await interaction.member.setNickname(`${register_name} | ${register_id}`).catch(er => {console.log(`There is a error!!!\n${er}`)});
                }
            } else {
                if(prefix != 0){
                    await interaction.member.setNickname(`${prefix} ${register_name}`).catch(er => {console.log(`There is a error!!!\n${er}`)});
                } else {
                    await interaction.member.setNickname(`${register_name}`).catch(er => {console.log(`There is a error!!!\n${er}`)});
                }
            }

            // Add Roles
            if(role_1 != 0) {
                const roleOne = interaction.guild.roles.cache.get(role_1);
                if(!roleOne) return;
                await interaction.member.roles.add(role_1);
            }
            
            if(role_2 != 0) {
                const roleTwo = interaction.guild.roles.cache.get(role_2);
                if(!roleTwo) return
                await interaction.member.roles.add(role_2);   
            } 
            
            // Reply
            await interaction.reply({content: '**Usuario Registrado!**', ephemeral: true})
        }
    } catch (error) {
        console.log(error)
    }
}