const fileupload = require("express-fileupload")
const {createUploadPath} = require ("./functions")
const path = require("path")
const uploadFile = async (req,res,next) =>{
    try {
        fileupload()
        if(req.file || Object.keys(req.files).length == 0) throw { status:400, message:"تصویری برای بارگذاری انتخاب شود"}
        let image = req.files.image
        let type = path.extname(image.name)
        if(![".png", ".jpg", ".jpeg", "gif"].includes(type)) throw {status:400, message:"فرمت ارسالی صحیح نمی باشد"}
        const image_path = path.join(createUploadPath(), (Date.now()+ type))
        req.body.image = image_path.substring(7)
        let uploadPath = path.join(__dirname,"..", "..",image_path)
        console.log(uploadPath);
        image.mv(uploadPath, (err) =>{

            if(err) throw { status:500, message: "بارگذاری تصویر انجام نشد"}
            next()
        })
    
        
    } catch (error) {
        next(error);
    }


}
module.exports ={
    uploadFile
}