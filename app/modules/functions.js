const {genSaltSync, hashSync} =require("bcrypt")
function hashString(str) {
    const salt = genSaltSync(10)
    return hashSync(str, salt)
    
}
module.exports ={
    hashString
}