import jwt from 'jsonwebtoken'

export const checkToken = (req, res, next)=>{
    const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({message: 'accesso non autorizzato'})
    }
    const token = header.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = {id:decoded.id, role: decoded.role, sede: decoded.sede}
            next()
        
    } catch (error) {
        if(error.name==='TokenExpiredError'){
            return res.status(401).json({message:'sessione scaduta, effettua di nuovo il login'})
        }
        else{
        return res.status(401).json({message:'Accesso non autorizzato'})
    }}
}