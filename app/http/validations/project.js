const {body} = require ("express-validator")
function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({min:20}).withMessage("توضیحات نمیتواند خالی باشد"),
        body("tags").isArray({min : 0, max : 10}).withMessage("حداکثر استفاده از هشتگ ها 10 عدد میباشد")


    ]

}
module.exports ={
    createProjectValidator
}
