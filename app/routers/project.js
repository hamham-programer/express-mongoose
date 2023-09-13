const {ProjectController} = require("../http/controllers/Project.Controller")
const {createProjectValidator} = require("../http/validations/project")
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {chechLogin} = require("../http/middlewares/autoLogin")
const {uploadFile} = require("../modules/express-fileupload")
const fileupload = require("express-fileupload")
const {mongoIdValidator} = require("../http/validations/public")

const {Router} = require("express")
const router = Router()
router.post("/create",fileupload(),chechLogin,uploadFile,createProjectValidator(),expressValidatorMapper, ProjectController.createProject)
router.get("/list",chechLogin,expressValidatorMapper, ProjectController.getAllProject)
router.get("/:id",chechLogin,mongoIdValidator(),expressValidatorMapper, ProjectController.getProjectById)
router.delete("/remove/:id",chechLogin,mongoIdValidator(),expressValidatorMapper, ProjectController.removeProject)
router.post("/edit/:id",chechLogin,mongoIdValidator(),expressValidatorMapper, ProjectController.updateProject)


module.exports ={
    projectRoutes : router
}

