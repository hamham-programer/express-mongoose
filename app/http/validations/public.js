
const { param } = require("express-validator")

function mongoIdValidator(){
    return [
        param("id").isMongoId().withMessage("شناسه ی ارسال شده صحیح نمیباشد")
        
    ]
}
module.exports = {
    mongoIdValidator
}