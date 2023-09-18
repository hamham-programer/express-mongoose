const {chechLogin} = require("../http/middlewares/autoLogin")
const {UserController} = require("../http/controllers/user.controller")
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {upload_multer} =require ("../modules/multer")
const {imageValidator}= require("./../http/validations/user") 
const {Router} = require("express")
const router = Router()

router.get("/profile", chechLogin, UserController.getProfile)
router.post("/profile", chechLogin, UserController.editProfile)
router.post("/profile-image", chechLogin,upload_multer.single("image"),imageValidator(),
expressValidatorMapper,
UserController.uploadProfileImage)
router.get("/requests",chechLogin,UserController.getAllRequest )
router.get("/requests/:status", chechLogin, UserController.getRequestsByStatus)
router.get("/change-status-request/:id/:status", chechLogin, UserController.changeStatusRequest)

module.exports ={
    userRoutes : router
}