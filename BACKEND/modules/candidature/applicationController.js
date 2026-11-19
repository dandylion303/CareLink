import Application from '../public/publicApplication.js'
import { profileFilter } from '../../utils/sedeFilter.js'

export const getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find(profileFilter(req.user))
            .populate('request', 'serviceType workAddress.city')
            .sort({ createdAt: -1 })
            .limit(10)

        res.status(200).json(applications)
    } catch (error) {
        next(error)
    }
}