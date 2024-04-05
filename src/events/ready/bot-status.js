const { Client, ActivityType } = require('discord.js');

/**
 * 
 * @param {Client} c 
 */
module.exports = (c) => {
    c.user.setActivity({
        name: 'Paris Bot - 2.0',
        type: ActivityType.Listening,
    });
}