const Guild = require('../../schemas/Infos/guild')
const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js')

module.exports = 
{
    name: 'add-server',
    description: 'Adiciona Um Server Ao Banco De Dados [SO PARA DESENVOLVEDORES]',
    devOnly : true,
    testOnly : true,
    deleted: false,
    options: [
        {
            name: 'id',
            description: 'Id Do Server A Qual Deseja Adicionar',
            require: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'name',
            description: 'Nome Do Server A Qual Deseja Adicionar',
            require: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'dias',
            description: 'Quantos Dias Que Voce Deseja Que O Bot Funcione No Servidor',
            require: true,
            type: ApplicationCommandOptionType.Number
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => 
    {
        try {
            //Get Options
            const selectedName = await interaction.options.get('name').value //Selected Name
            const selectedID = await interaction.options.get('id').value //Selected Serverr ID
            const days = await interaction.options.get('dias').value //Days Time

            const msDays = days * 24 * 60 * 60 * 1000; //Days In Miliseconds

            //Check If Already Exist's
            const guildName_DB = await Guild.findOne({guildName: selectedName}); //Search For The Name In Database
            const guildID_DB = await Guild.findOne({guildID: selectedID}) //Search For The ID In Database
            if(guildName_DB || guildID_DB){
                await interaction.reply(`**Opa!**\n**Parece que ja existe este ID [${selectedID}], Ou Esse Nome [${selectedName}], No Nosso Banco De Dados, Por Favor Tente Novamente.**`) //Return Because The Name || Id Already Exist's In Database
            } else {
                const newGuild = new Guild({
                    guildName: selectedName, //Guild Name In Database
                    guildID: selectedID, //Guild Id In Database
                    rentExpireAt: new Date(Date.now() + msDays) //Rent Expire Date
                });
                await newGuild.save();
                await interaction.reply(`**O Servidor Foi Adicionado Com Sucesso No Banco De Dados!**`)

                const currentDate = new Date();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const year = currentDate.getFullYear();
                console.log(`---------------------------------------------\nUm Servidor Foi Adicionado Ao Banco De Dados Por:\nNome: ${interaction.member.displayName}\nID Do Usuario: ${interaction.member.id}\nData: ${day}/${month}/${year}\n---------------------------------------------\nID Do Servidor Adicionado: ${selectedID}\nNome Do Servidor Adicionado: ${selectedName}\n---------------------------------------------`)
            }
        } catch (error) {
            console.log("a")
        }
    }
}