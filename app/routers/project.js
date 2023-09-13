const {ProjectController} = require("../http/controllers/Project.Controller")
const {createProjectValidator} = require("../http/validations/project")
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {chechLogin} = require("../http/middlewares/autoLogin")
const {uploadFile} = require("../modules/express-fileupload")
const fileupload = require("express-fileupload")


const {Router} = require("express")
const router = Router()
router.post("/create",fileupload(),chechLogin,uploadFile,createProjectValidator(),expressValidatorMapper, ProjectController.createProject)

module.exports ={
    projectRoutes : router
}

