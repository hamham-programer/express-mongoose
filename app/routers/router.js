const {Router} = require("express")
const router = Router()
const {projectRoutes}  require ("./project")
const {teamRoutes}  require ("./team")
const {userRoutes}  require ("./user")
const {authRoutes}  require ("./auth")

router.use("/auth", authRoutes)
router.use("/project", projectRoutes)
router.use("/team", teamRoutes)
router.use("/user", userRoutes)


module.exports ={
    AllRouter : router
}