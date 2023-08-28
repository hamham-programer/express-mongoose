const {validationResult} = require ("express-validator")
const {hashString, tokenGenerator} =require ("../../modules/functions")
const {userModel} = require("../../model/user.model")
const bcrypt = require("bcrypt")
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
    async login(req,res,next){
        try {
        const {username, password} = req.body
        console.log(req.headers);
        const user = await userModel.findOne({username})
        if(!user) throw{
            status:401,
            message: "نام کاربری یا رمز عبور وجود ندارد"
        } 
        
        const compareResult = bcrypt.compareSync(password, user.password)
        if(!compareResult) throw{
            status:401,
            message: "نام کاربری یا رمز عبور وجود ندارد"
        } 
        const token = tokenGenerator({username})
        user.token = token
        user.save()
        return res.status(200).json({
            status:200,
            success:true,
            message: "شما با موفقیت احراز شدید",
            token
        })
    }
       catch (error) {
            next(error)
            
        }
    }
    resetPassword(){
        
    }
}
module.exports ={
    AuthController: new AuthController()
}