const { Schema, model } = require('mongoose');

const guilds_schema = new Schema({
    // Guild Name
    guild_name: {
        type: String,
        required: true,
        default: 'No Server Name'
    },

    // Guild ID
    guild_id: {
        type: String,
        required: true,
        default: 'ID Unavailable',
    },

    // Buyer User ID
    buyer_user_id:{
        type: String,
        required: true,
        default: 'ID Of The Buyer Is Not Available'
    },

    // Exit Log Channel ID
    exit_log_id: {
        type: String,
        required: false,
        default: null,
    },
    // Register Log Channel ID
    register_log_id: {
        type: String,
        required: false,
        default: null,
    },

    // Rent Expiration Date
    rent_expire_date:{
        type: Date,
        required: true,
        default: 0,
    },
});

module.exports = model('Guilds', guilds_schema);