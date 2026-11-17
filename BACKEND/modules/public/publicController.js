import Request from "../request/Request.js"
import Application from "./publicApplication.js"
import { sendApplicationEmail } from "../../config/mailer.js"


export const getPublicRequests = async (req, res, next) => {
    try {
        const publicRequests = await Request.find({ isPublic: true })
            .select('statusRichiesta serviceType workRequest oreSettimanali durationType workAddress.city inquadramento livello publicDescription colfDetails.specificCompetenceNeeded badanteDetails.selfSufficientLevel badanteDetails.mobility ')
        const openRequests = publicRequests.filter((request) => request.statusRichiesta === 'Attiva' || request.statusRichiesta === 'inProva')
        res.status(200).json(openRequests)

    } catch (error) {
        next(error)
    }
}

export const createApplication = async (req, res, next) => {
    try {
        const id = req.params.id
        const postedRequest = await Request.findById(id).populate('sede', 'email name')
        if (!postedRequest) {
            return res.status(404).json({ message: 'nessuna richiesta trovata' })
        }
        if (postedRequest.isPublic !== true) {
            return res.status(400).json({ message: 'questo annuncio non è pubblico, non dovresti essere qui' })
        }
        if (postedRequest.statusRichiesta !== 'Attiva' && postedRequest.statusRichiesta !== 'inProva') {
            return res.status(404).json({ message: 'Questa richiesta non risulta aperta al pubblico' })
        }
        const { name, lastName, phone, email, message, privacyConsent } = req.body
        const carerApplication = await Application.create({ ...req.body, request: id, sede: postedRequest.sede._id })
        await sendApplicationEmail(postedRequest.sede.email, carerApplication, postedRequest)
        res.status(201).json({ message: 'Candidatura inviata' })
    } catch (error) {
        next(error)
    }
}


