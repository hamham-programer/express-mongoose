const {body} = require ("express-validator")
const {TeamModel} = require("../../model/team.model")

function createTeamValidator() {
    return [
        body("name").isLength({min:5}).withMessage("نام تیم نمی تواند کمتر از 5 نویسه باشد"),
        body("description").notEmpty().withMessage("توضیحات نمی تواند خالی باشد"),
        body("username").custom(async(username)=>{
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if(usernameRegex.test(username)){
                const team = await TeamModel.findOne({username})
                if(team) throw "نام کاربری قبلا توسط تیم دیگر انتخاب شده است"
                return true

            }
            throw "نام کاربری را به طور صحیح وارد کنید"

        })
    ]
    
}
/* function inviteUserToTeam() {
    param("teamID").custom((teamID, req) =>{
        const userId =req.user._id

        const team = await TeamModel.findOne({
            $or : [{owner:userId},{users:userId}],
            _id:userId
        })
        if(!team) throw {status:400, message:"تیمی جهت دعوت کردن یافت نشد"}
        
    })
    
},
param("usename").custom(username =>{

}) */
module.exports ={
    createTeamValidator
}