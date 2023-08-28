const {body} = require("express-validator")
const {username} = require("../../model/user.model")
const {userModel} = require("../../model/user.model")


function registerValidator() {
    return [
        body("username").isLength({min:4, max: 20}).custom(async(value, ctx) =>{
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user =await userModel.findOne({username: value})
                    if(user) throw "نام کاربری قبلا در سیستم ثبت شده است"
                    return true 
                }
            }
            throw "نام کاربری نمی تواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد")
           .custom(async email =>{
            const user =await userModel.findOne({email})
            if(user) throw "ایمیل قبلا در سیستم ثبت شده است"
            return true

        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمی باشد")
           .custom(async mobile =>{
            const user =await userModel.findOne({mobile})
            if(user) throw "موبایل قبلا در سیستم ثبت شده است"
            return true

        }),
        body("password").isLength({min:6 , max:20}).withMessage("رمز عبور حداق 6 و حداکثر 20 نویسه باید باشد").
        custom((value, ctx) => {
            if(!value) { throw " رمز عبور نمی تواند خالی باشد"}
            if(value !== ctx?.req?.body?.confirm_password) {
                throw "رمز عبور با تکرار آن برابر نمی باشد"
                
            }
            return true
        })
    ]
    
}

function loginValidator() {
    return [
        body("username").notEmpty().withMessage("نام کاربری نمی تواند خالی باشد")
        .custom( username =>{
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
            if(usernameRegex.test(username)){
                return true 
            }
            throw "نام کاربری صحیح نمی باشد"
        
        }),
        body("password").isLength({min:4 , max:20}).withMessage("رمز عبور حداقل4 و حداکثر 20 نویسه باید باشد")
    ]
    
}
module.exports ={
    registerValidator,
    loginValidator
}
