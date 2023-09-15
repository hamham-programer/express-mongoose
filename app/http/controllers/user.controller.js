const {userModel} = require("../../model/user.model")
const {createLinkForFiles}= require("../../modules/functions")
class UserController{
    getProfile(req,res,next){
        try {
            const user = req.user
            user.profile_image = createLinkForFiles(user.profile_image,req)
            return res.status(200).json({
                status:200,
                success: true,
                user
            })
            
        } catch (error) {
            next(error)
            
        }

    }
    async editProfile(req,res,next){
        try {
            let data = {...req.body}
            const userId = req.user._id
            let fields = ["first_name", "last_name", "skills"]
            let badValues = ["", " ", null, undefined, 0, -1, NaN, {},[]]
            Object.entries(data).forEach(([key, value]) =>{
                console.log(key,value);
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key]
            })
            console.log(data);
            const result = await userModel.updateOne({_id:userId}, {$set : data})
            if(result.modifiedCount > 0){
               return res.status(200).json({
                    status:200,
                    success:true,
                    message: "بروزرسانی پروفایل با موفقیت انجام شد"
                })
            }
            throw {status:401, message: "بروزرسانی با خطا مواجه شد"}
            
        } catch (error) {
            next(error)
            
        }

    }
    async uploadProfileImage(req,res,next){
        try {
            const userID = req.user._id
            console.log(req.file)
            if(Object.keys(req.file).Length == 0) throw {status: 400, message:"لطفا یک تصویر انتخاب شود"}
            const filePath = req.file?.path.replace("\\\\", "/").substring(7)
            const result = await userModel.updateOne({_id: userID}, {$set : {profile_image :filePath}})
            if(result.modifiedCount == 0) throw {status:400, message:"برزورسانی انجام نشد"}
            return res.status(200).json({
                status:200,
                success:true,
                message: "بروزرسانی با موفقیت انجام شد"
            })
        } catch (error) {
            
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    acceptIviteInTeam(){

    }
    rejectInviteInTeam(){

    }
    
}
module.exports ={
    UserController: new UserController()
}