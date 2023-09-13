const autoBind = require("auto-bind");
const {ProjectModel} = require("../../model/project.model")
//npm i auto-bind@4

class ProjectController{
  constructor(){
    autoBind(this)
  }
    async createProject (req,res,next){
      try {

            const {title, text, image,tags} = req.body
            console.log(tags);
            const owner = req.user._id
            const result = await ProjectModel.create({title,text,owner, image,tags})
            if(!result) throw {status:400 , message: "ایجاد پروژه با مشکل مواجه شد"}
            return res.status(201).json({
                status:201,
                success:true,
                message:"پروژه یا موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
            
        }

    }
/* 
   async getAllProject(req,res,next){
      try {
        const owner = req.user._id
        const projects = await ProjectModel.find({owner})
        return res.status(200).json({
          status:200,
          success:true,
          projects
        })
        
      } catch (error) {
        next(error)
        
      }

    } */
    async getAllProject(req, res, next) {
      try {
        const owner = req.user._id;
        const projects = await ProjectModel.find({owner});
        return res.status(200).json({
          status : 200,
          success : true,
          projects
        })
      } catch (error) {
        next(error)
      }
    }
    async findProject (owner,projectID){
       const project = await ProjectModel.findOne({owner, _id:projectID})
      if(!project) throw {status:404, message:"پروژه یافت نشد"}
      return project

    }
   async getProjectById(req,res,next){
    try {
       const owner = req.user._id
      const projectID = req.params.id
      const project = await this.findProject(owner,projectID)
      return res.status(200).json({
        status:200,
        success:true,
        project
      })
      
    } catch (error) {
      next(error)
      
    }

    }

    async removeProject(req,res,next){
      try {
      const owner = req.user._id
      const projectID = req.params.id
      const project = await this.findProject(owner,projectID)
      const deleteProject = await ProjectModel.deleteOne({_id:projectID})
      if(deleteProject.deletedCount == 0) throw {status:400, message:"پروژه برای حذف وجود ندارد"}
      return res.status(200).json({
        status:200,
        success:true,
        message:"پروژه با موفقیت حذف شد"
      })
      
        
      } catch (error) {
        next(error)
        
      }

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
}
module.exports ={
    ProjectController: new ProjectController()

}