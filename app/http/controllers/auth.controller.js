const {validationResult} = require ("express-validator")
const {hashString} =require ("../../modules/functions")
const {userModel} = require("../../model/user.model")
class AuthController{
   async register(req,res,next){
       try {
        const {username, email, password, mobile} = req.body
        const hashpassword = hashString(password)
        const user =await userModel.create({
            username,
            email,
            password: hashpassword,
            mobile
        })
        .catch(err =>{
            if(err?.code == 11000){
                throw {status:400, message: "نام کاربری در سیستم موجود هست"}
            }
        })

        return res.json(user)       
        
       } catch (error) {
        next(error)
        
       }
    }  
    login(){

    }
    resetPassword(){
        
    }
}
module.exports ={
    AuthController: new AuthController()
}