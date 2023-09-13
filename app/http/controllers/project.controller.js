const {ProjectModel} = require("../../model/project.model")

class ProjectController{
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

    getAllProject(){

    }
    getProjectById(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){

    }
}
module.exports ={
    ProjectController: new ProjectController()

}