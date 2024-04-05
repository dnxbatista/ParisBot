const {Schema, model} = require('mongoose');

const guildSchema = new Schema({
    //Guild Name
    guildName: {
        type: String,
        required: true,
    },
    //Guild Id
    guildID:{
        type: String,
        required: true,
    },
    //Exit Log Channel Id (Set By Command)
    exitLogID:{
        type: String,
        required: false, 
        default: null,     
    },
    //Register Log Channel Id (Set By Command)
    registerLogID:{
        type: String,
        required: false,
        default: null,
    },
    //TEMP
    role2Id:{
        type: String,
        required: false,
        default: null,
    },
    //TEMP
    role3Id:{
        type: String,
        required: false,
        default: null,
    },
    //Date That The Guild Rent Expires (Remove From Date Base - Managed By Event)
    rentExpireAt:{
        type: Date,
        required: true,
    }
}, {timestamps: true}
);

module.exports = model('Guild', guildSchema);