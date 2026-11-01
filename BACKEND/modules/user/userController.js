import User from "./User.js";

export const getAllUsers = async (req, res, next)=>{
try {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
} catch (error) {
    next(error)
}    
}

export const getSingleUser = async (req, res, next)=>{
    try {
        const userId = req.params.id
        const singleUser = await User.findById(userId)
        if(!singleUser){
            res.status(404).json({message: 'Utente non trovato'})
        } else {
            res.status(200).json(singleUser)
        }
    } catch (error) {
        next(error)
    }
}

export const deactivateUser = async (req, res, next)=>{
    try {
        const userId = req.params.id
        const deactivatedUser = await User.findByIdAndUpdate(
            userId,
            {isActive: false},
            {new: true, runValidators: true}
        )
        if(!deactivatedUser){
            res.status(404).json({message:'Utente non trovato'})
        } else{
            res.status(200).json(deactivatedUser)
        }
        
    } catch (error) {
        next(error)
    }
}