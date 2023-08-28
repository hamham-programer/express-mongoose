const {genSaltSync, hashSync} =require("bcrypt")
const jwt = require("jsonwebtoken")
function hashString(str) {
    const salt = genSaltSync(10)
    return hashSync(str, salt)
    
}
function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : "365 days"})
    return token
}
function verifyJwtToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if(!result?.username) throw {status : 401, message : "لطفا وارد حساب کاربری خود شوید"}
    return result
}
module.exports ={
    hashString,
    tokenGenerator
}
