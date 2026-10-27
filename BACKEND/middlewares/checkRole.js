export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (allowedRoles.includes(req.user.role)) {
            next()
        }
        else {
            return res.status(403).json({ message: 'non hai i permessi per fare questo' })
        }
    }
}