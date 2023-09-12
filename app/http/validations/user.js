const {body} = require ("express-validator")
const path = require ("path")
function imageValidator() {
    return [
        body("image").custom((value, {req}) =>{
            if(Object.keys(req.file).Length == 0) throw "لطفا یک تصویر انتخاب کنید"
            const ext = path.extname(req.file.originalname)
            const exts = [".png", ".jpg", ".jpeg", ".webp"]
            if(!exts.includes(ext)) throw "فرمت تصویر ارسالی صحیح نمی باشد"
            const maxsize = 2*1024*1024
            if(req.file.size > maxsize) throw "حجم فایل نمی تواند بیش از 2 مگابایت باشد"
            return true
        })
    ]
    
}
module.exports={
    imageValidator
}