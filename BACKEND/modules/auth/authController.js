import bcrypt from 'bcryptjs'
import User from '../user/User.js'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next) => {
    try {
        const { password, ...otherData } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ ...otherData, password: hashedPassword })
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const { password, email } = req.body
        if(!email||!password){
            return res.status(400).json({message:'email e password sono obbligatorie'})
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'credenziali non valide' })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({ message: 'credenziali non valide' })
        }
        if(!user.isActive){
            return res.status(403).json({message: 'utente non attivo'})
        }
        const token = jwt.sign({ id:user._id, role:user.role, sede:user.sede },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN })
        res.status(200).json({token})


    } catch (error) {
        next(error)
    }
}