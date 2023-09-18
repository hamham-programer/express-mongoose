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
   async getAllRequest(req,res,next){
        try {
            const userId = req.user._id
            const {inviteRequests} = await userModel.findById(userId, {inviteRequests:1})
            return res.json({
                request:inviteRequests || []
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async getRequestsByStatus(req, res, next) {
        try {
          const { status } = req.params;
          const userID = req.user._id;
          const requests = await userModel.aggregate([
            {
              $match: { _id: userID },
            },
            {
              $project: {
                inviteRequests: 1,
                _id: 0,
                inviteRequests : {
                    $filter : {
                        input : "$inviteRequests",
                        as : "request",
                        cond : {
                            $eq : ["$$request.status", status]
                        }
                    }
                }
              },
            },
          ]);
          return res.status(200).json({
            status: 200,
            success: true,
            requests : requests?.[0]?.inviteRequests || []
          });
        } catch (error) {
          next(error);
        }
      }
    
      async changeStatusRequest(req,res,next){
        try {
            const {id,status} = req.params
            const request = await userModel.findOne({"inviteRequests._id": id })
            if(! request) throw {status:404, message:"درخواستی با این مشخصات وجود ندارد"}
            const findRequest = request.inviteRequests.find(item =>item.id == id)
            if(findRequest.status !== "pending") throw {status:400 , message:"این درخواست قبلا  رد یا پذیرفته شده است"}
            if(!["accepted", "rejected"].includes(status)) throw {status:400 , message:"اطلاعات ارسالی صحیح نمی باشد"}
            const updateResult = await userModel.updateOne({"inviteRequests._id" : id}, {$set: {
                "inviteRequests.$.status": status
            }})
            if(updateResult.modifiedCount == 0 ) throw {status:500, message:"تغییر وضعیت درخواست انجام نشد"}
            return res.status(200).json({
                status:200,
                success:true,
                message:" تغییر وضعیت درخواست با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
            
        }
  
      }
      rejectInviteInTeam(){
  
      }
      
    addSkills(){

    }
    editSkills(){

    }
}
module.exports ={
    UserController: new UserController()
}