const crypto = require('crypto');
const Users = require('../../schemas/Auth/users_schema');

async function generateToken(){
    // Gera um buffer de 16 bytes aleatórios
    const buffer = crypto.randomBytes(16);
    
    // Converte o buffer para uma string hexadecimal
    const randomNum = buffer.toString('hex');
    
    // Retorna os primeiros 32 caracteres (16 bytes = 32 dígitos hexadecimais)
    return `@${randomNum.substring(0, 32)}`;
}

async function createNewUser(user_id){
    try {
        //Returns If User Already Exists
        const user = await Users.findOne({user_id: user_id});
        if(user) return false;

        const newUser = new Users({
            user_id: user_id,
            user_type: 'client',
            token: await generateToken(),
        });
        await newUser.save();
        console.log('📞 | API - Auth (createNewUser [POST] )');
        return true    
    } catch (error) {
        console.log(error);
        return false
    }
}

async function checkUserToken(user_id, token){
    const user = await Users.findOne({user_id: user_id, token: token});

    if(!user) return false;
    console.log('📞 | API - Auth (checkUserToken [POST] )');
    return true;
}

async function checkUserType(user_id, token, user_type){
    const user = await Users.findOne({user_id: user_id, token: token, user_type: user_type});
    if(!user) return false;
    console.log('📞 | API - Auth (checkUserType [POST] )');
    return true
}

async function getUserToken(user_id){
    try {
        const user = await Users.findOne({user_id: user_id});
        if(!user) return false;
        console.log('📞 | API - Auth (getUserToken [POST] )');
        return user.token;
    } catch (error) {
        console.log(error);
        return false
    } 
}

module.exports = {
    generateToken,
    createNewUser,
    checkUserToken,
    checkUserType,
    getUserToken,
}