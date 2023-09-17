const {TeamController} = require("../http/controllers/team.Controller")
const {chechLogin} = require("../http/middlewares/autoLogin")
const {createTeamValidator} = require("../http/validations/team")
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {mongoIdValidator} = require("../http/validations/public")

const {Router} = require("express")
const router = Router()

router.post("/create", chechLogin,createTeamValidator(),expressValidatorMapper,TeamController.createTeam)
router.get("/list", chechLogin,TeamController.getListOfTeam)
router.get("/me", chechLogin,TeamController.getMyTeam)
router.get("/invite/:teamID/:username", chechLogin,TeamController.inviteUserToTeam)
router.get("/:id", chechLogin,mongoIdValidator(),expressValidatorMapper,TeamController.getTeamById)
router.delete("/remove/:id", chechLogin,mongoIdValidator(),expressValidatorMapper,TeamController.removeTeamById)


module.exports ={
    teamRoutes : router
}