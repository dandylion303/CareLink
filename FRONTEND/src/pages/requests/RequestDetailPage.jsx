import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Spinner, Row, Col, Button } from 'react-bootstrap'
import { StatusBadge } from '../../components/StatusBadge'
import { ArrowLeft, SquarePen } from "lucide-react"

const URL = import.meta.env.VITE_API_URL

const formatDate = (date) => new Date(date).toLocaleDateString('it-IT')

export const RequestDetailPage = () => {
    const { id } = useParams()
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [matches, setMatches] = useState([])

    const getRequest = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setErrorMessage("Non hai l'autorizzazione per fare questo")
                return
            }
            const response = await fetch(`${URL}/requests/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setRequest(result)
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getMatches = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/matching/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            const result = await response.json()
            if (response.ok) {
                setMatches(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/requests/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ statusRichiesta: newStatus })
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setNewStatus('')
                getRequest()
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)
        }
    }



    useEffect(() => {
        getRequest()
        getMatches()
    }, [id])

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </Spinner>
            </div>
        )
    }

    if (errorMessage) {
        return (
            <div className="bg-cl-negative p-3 rounded-3">
                <p className="mb-0">{errorMessage}</p>
            </div>
        )
    }





    return (
        <>
            <Link to="/request" className="small d-inline-flex align-items-center gap-1 mb-3">
                <ArrowLeft size={16} aria-hidden="true" />
                Torna alle richieste
            </Link>

            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                    <h1 className="mb-0">
                        {request.famiglia.customerName} {request.famiglia.customerLastname}
                    </h1>
                    <StatusBadge status={request.statusRichiesta} />
                </div>
                <div>
                    <Link to={`/request/${id}/edit`} className="btn btn-outline-secondary">
                        Modifica <SquarePen size={16} />
                    </Link>
                </div>
            </div>

            {/* ---------- INTERMEDIAZIONE ---------- */}
            <Row className="mx-1 mb-4 bg-cl-surface border border-cl rounded-3">
                <Col md={5}>
                    <div className="p-4 h-100">
                        <h2 className="h5 mb-3">Contatti</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Telefono:</span> {request.famiglia.phone}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Email:</span> {request.famiglia.email}</p>
                        <hr />
                        <h2 className="h5 mb-3 mt-3">Luogo di lavoro</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Indirizzo:</span> {request.workAddress.address}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Città:</span> {request.workAddress.city} ({request.workAddress.provincia})</p>
                    </div>
                </Col>
                <Col md={7}>
                    <div className=" p-4 h-100">
                        <h2 className="h5 mb-3">Intermediazione</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Costo:</span> {request.serviceFee ? `€ ${request.serviceFee}` : 'non indicato'}</p>
                        <p className="mb-1"><span className="text-cl-secondary">In bacheca:</span> {request.isPublic ? 'Sì' : 'No'}</p>
                        {request.isPublic && (
                            <p className="mb-3"><span className="text-cl-secondary">Testo pubblico:</span> {request.publicDescription}</p>
                        )}

                        {request.statusRichiesta !== 'chiusa' && (
                            <div className="d-flex gap-2 mt-3">
                                <select
                                    aria-label="Nuovo stato"
                                    className="form-select"
                                    value={newStatus}
                                    onChange={(event) => setNewStatus(event.target.value)}>
                                    <option value="">Cambia stato</option>
                                    {request.statusRichiesta === 'inAttesa' && (
                                        <option value="Attiva">Attiva</option>
                                    )}
                                    <option value="Chiusa">Chiusa</option>
                                </select>
                                <Button disabled={newStatus === ''} onClick={updateStatus}>Salva</Button>
                            </div>
                        )}
                    </div>

                </Col>

            </Row>

            <Row className="mx-1 mb-4 bg-cl-surface border border-cl rounded-3">
                <Col md={6}>
                    <div className="p-4 h-100">
                        <h2 className="h5 mb-3">Richiesta</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Tipologia:</span> <span className="text-capitalize">{request.serviceType}</span></p>
                        <p className="mb-1"><span className="text-cl-secondary">Regime:</span> {request.workRequest}</p>
                        <p className="mb-1"><span className="text-cl-secondary">Livello:</span> {request.livello} · tabella {request.inquadramento}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Maggiorazioni:</span> {request.maggiorazioni.length > 0 ? request.maggiorazioni.join(', ') : 'nessuna'}</p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="bg-cl-surface p-4 h-100 w-100">
                        <h2 className="h5 mb-3">Rapporto di lavoro</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Ore settimanali:</span> {request.oreSettimanali} ore</p>
                        <p className="mb-1"><span className="text-cl-secondary">Durata:</span> <span className="text-capitalize">{request.durationType}</span></p>
                        <p className="mb-1"><span className="text-cl-secondary">Inizio:</span> {formatDate(request.startDate)}</p>
                        {request.endDate && (
                            <p className="mb-0"><span className="text-cl-secondary">Fine:</span> {formatDate(request.endDate)}</p>
                        )}
                    </div>
                </Col>
            </Row>


            <Row className="g-4 mb-4">

                {request.serviceType === 'colf' && (
                    <Col md={6}>
                        <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                            <h2 className="h5 mb-3">Dettagli colf</h2>
                            <p className="mb-1"><span className="text-cl-secondary">Esperienza:</span> <span className="text-capitalize">{request.colfDetails?.experienceLevel}</span></p>
                            {request.colfDetails?.otherStaff && (
                                <p className="mb-1"><span className="text-cl-secondary">Altri addetti da coordinare:</span> <span className="text-capitalize">{request.colfDetails.otherStaff}</span></p>
                            )}
                            {request.colfDetails?.specificCompetenceNeeded?.length > 0 && (
                                <p className="mb-0"><span className="text-cl-secondary">Competenze richieste:</span> <span className="text-capitalize">{request.colfDetails.specificCompetenceNeeded.join(', ')}</span></p>
                            )}
                        </div>
                    </Col>
                )}

                {request.serviceType === 'babysitter' && (
                    <Col md={6}>
                        <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                            <h2 className="h5 mb-3">Dettagli babysitter</h2>
                            <p className="mb-1"><span className="text-cl-secondary">Numero di bambini:</span> {request.babySitterDetails?.numberOfChildren}</p>
                            <p className="mb-1"><span className="text-cl-secondary">Nascita del più piccolo:</span> {formatDate(request.babySitterDetails?.dateOfBirthYoungest)}</p>
                            {request.babySitterDetails?.specialNeeds && (
                                <p className="mb-0"><span className="text-cl-secondary">Esigenze particolari:</span> {request.babySitterDetails.specialNeeds}</p>
                            )}
                        </div>
                    </Col>
                )}
                {request.serviceType === 'badante' && (
                    <Col md={12}>
                        <div className="bg-cl-surface border border-cl rounded-3 p-4">
                            <h2 className="h5 mb-3">Persona da assistere</h2>
                            <Row>
                                <Col md={6}>
                                    <p className="mb-1"><span className="text-cl-secondary">Nome:</span> {request.badanteDetails?.mainAssistedName}</p>
                                    <p className="mb-1"><span className="text-cl-secondary">Età:</span> {formatDate(request.badanteDetails?.ageRange)}</p>
                                    <p className="mb-1"><span className="text-cl-secondary">Assistiti non autosufficienti:</span> {request.badanteDetails?.numberOfAssisted}</p>
                                    <p className="mb-1"><span className="text-cl-secondary">Autosufficienza:</span> {request.badanteDetails?.selfSufficientLevel}</p>
                                    <p className="mb-1"><span className="text-cl-secondary">Stato cognitivo:</span> {request.badanteDetails?.cognitiveState}</p>
                                </Col>
                                <Col md={6}>
                                    <p className="mb-1"><span className="text-cl-secondary">Mobilità:</span> {request.badanteDetails?.mobility}</p>
                                    <p className="mb-1"><span className="text-cl-secondary">Terapie o macchinari:</span> <span className="text-capitalize">{request.badanteDetails?.hasSpecialNeeds}</span></p>
                                    {request.badanteDetails?.therapiesDetail && (
                                        <p className="mb-1"><span className="text-cl-secondary">Dettaglio terapie:</span> {request.badanteDetails.therapiesDetail}</p>
                                    )}
                                    {request.badanteDetails?.specialDiet && (
                                        <p className="mb-1"><span className="text-cl-secondary">Dieta:</span> {request.badanteDetails.specialDiet}</p>
                                    )}
                                    {request.badanteDetails?.sleepsAtNight && (
                                        <p className="mb-0"><span className="text-cl-secondary">Dorme la notte:</span> <span className="text-capitalize">{request.badanteDetails.sleepsAtNight}</span></p>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                )}
                <Col md={6}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                        <h2 className="h5 mb-3">Preferenze</h2>
                        {request.pets?.cani > 0 && (
                            <p className="mb-1"><span className="text-cl-secondary">Cani:</span> {request.pets.cani}</p>
                        )}
                        {request.pets?.gatti > 0 && (
                            <p className="mb-1"><span className="text-cl-secondary">Gatti:</span> {request.pets.gatti}</p>
                        )}
                        {request.pets?.altro && (
                            <p className="mb-1"><span className="text-cl-secondary">Altri animali:</span> {request.pets.altro}</p>
                        )}
                        {request.requiredLanguage && (
                            <p className="mb-1"><span className="text-cl-secondary">Lingua richiesta:</span> {request.requiredLanguage}</p>
                        )}
                        <p className="mb-1"><span className="text-cl-secondary">Patente richiesta:</span> {request.requiredDrivingLicense ? 'Sì' : 'No'}</p>
                        {request.notes && (
                            <p className="mb-0"><span className="text-cl-secondary">Note:</span> {request.notes}</p>
                        )}
                    </div>
                </Col>
            </Row>
            <h2>Le Carer più adatte</h2>
            <p>{matches.length} Carer Trovate</p>



        </>
    )
}





