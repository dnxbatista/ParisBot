const { Schema, model } = require('mongoose');

const users_schema = new Schema({
    //User ID
    user_id: {
        type: String,
        required: true,
    },

    user_type: {
        type: String,
        required: true,
        default: 'client'
    },

    //User Token
    token: {
        type: String,
        required: true,
    }
});

module.exports = model('Users', users_schema);