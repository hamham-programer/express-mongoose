const {verifyJwtToken} = require("../../modules/functions")
const {userModel} = require("../../model/user.model")

const chechLogin = async(req,res,next) =>{
    try {
        const authError = {status:401, message:"لطفا وارد حساب کاربری خود شوید"}
        const authorization = req?.headers?.authorization
        if(!authorization) throw authError
        let token = authorization.split(" ")?.[1]
        if(!token) throw authError
        const result = verifyJwtToken(token)
         const {username} = result
         console.log(result);
        const user =await userModel.findOne({username}, {password:0}) 
     
        if(!user) throw authError
        req.user = user
        return next()
        
    } catch (error) {
        next(error)
        
    }


}
module.exports ={
    chechLogin 
}