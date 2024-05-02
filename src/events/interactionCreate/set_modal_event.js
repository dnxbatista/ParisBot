const { Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, User } = require('discord.js');

//INTERACTION ID ===> 02

/**
 * 
 * @param {User} user
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    // Interaction Checks
    if (!interaction.isButton()) return;
    if (!interaction.customId.split("-")[0] === "01") return;

    try {
        // Get Params
        const selected_role_1 = await interaction.customId.split("-")[1];
        const selected_role_2 = await interaction.customId.split("-")[2];
        const prefix = await interaction.customId.split("-")[3];
        const has_id = await interaction.customId.split("-")[4];

        // Modal
        const modal = new ModalBuilder({
            title: 'Registrar-se'
        })

        // Inputs
        const modal_name_input = new TextInputBuilder({
            custom_id: 'register_name',
            label: 'Seu Nome',
            min_length: 2,
            max_length: 12,
            placeholder: "Ex: Alejandro",
            required: true,
            style: TextInputStyle.Short,
        });

        const modal_id_input = new TextInputBuilder({
            custom_id: 'register_id',
            label: 'Seu ID',
            placeholder: "Ex: 54353",
            required: true,
            style: TextInputStyle.Short,
        });

        // Action Rows
        const name_row = new ActionRowBuilder().addComponents(modal_name_input);
        const id_row = new ActionRowBuilder().addComponents(modal_id_input);
        if(has_id != 0){ // If has_id => true
            modal.setCustomId(`021-${selected_role_1}-${selected_role_2}-${prefix}`)
            modal.addComponents(name_row, id_row);
        } else {
            modal.setCustomId(`020-${selected_role_1}-${selected_role_2}-${prefix}`)
            modal.addComponents(name_row)
        }

        await interaction.showModal(modal);
    } catch (error) {
        console.log(error);
    }
}