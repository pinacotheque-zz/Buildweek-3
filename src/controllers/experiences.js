import experiencesModel from "../models/experiences.js"
import Profile from "../models/profile.js"


const postExperience = async (req, res, next) =>{

    try {
        const newExperience = new experiencesModel(req.body)
        
        const dbResponse = await newExperience.save() 
        console.log(dbResponse)


        const experienceToInsert = {... newExperience.toObject(), createdAt: new Date()}

        const updatedProf = await Profile.findByIdAndUpdate(
            req.params.userId,
            {$push: {experiences: experienceToInsert}},
            {
                new: true,
                runValidators: true,
            }
        )

        res.send(updatedProf)

    } catch (error) {
        next(error)
    }
    
}


const getAllExp = async (req, res, next) =>{

    try {
        const user = await Profile.findById( req.params.userId)
        
       console.log(user);
        res.send(user.experiences)

    } catch (error) {
        next(error)
    }
    
}


const getOneExp = async (req, res, next) =>{

    try {
        const user = await Profile.findById(req.params.userId, {
            experiences: {$elemMatch : { _id: req.params.expId }}
        })
        
       
        res.send(user.experiences[0])

    } catch (error) {
        next(error)
    }
    
}

const changeOneExp = async (req, res, next) =>{

    try {
        const user = await Profile.findOneAndUpdate({_id: req.params.userId,
            'experiences._id': req.params.expId}, 
            {$set: {'experiences.$' : req.body}}, 
            {new: true,
                runValidators: true})
        
        
       
        res.send(user)

    } catch (error) {
        console.log(error);
        next(error)
    }
    
}


const eraseOneExp = async (req, res, next) =>{

    try {
        const user = await Profile.findByIdAndUpdate( req.params.userId,{
        $pull: { experiences : {_id: req.params.expId}}
        }
            , 
            {new: true,
                runValidators: true})
        
        
       
        res.send(user)
                console.log(user);
    } catch (error) {
        console.log(error);
        next(error)
    }
    
}

const Controllers = {

    newExp: postExperience,
    getAllExp,
    getOneExp,
    changeOneExp,
    eraseOneExp

}




export default Controllers
