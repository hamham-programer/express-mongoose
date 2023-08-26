const {Router} = require("express")
const router = Router()
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {AuthController} = require("./../http/controllers/auth.controller")
const {registerValidator}= require("./../http/validations/auth") 
router.post("/register", registerValidator(),expressValidatorMapper,AuthController.register)

module.exports ={
    authRoutes : router
}