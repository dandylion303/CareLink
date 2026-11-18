import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Spinner } from "react-bootstrap"

const URL = import.meta.env.VITE_API_URL

const columns = [
    {
        status: 'inAttesa',
        title: 'Da far firmare',
        hint: "Richieste in attesa del modulo d'incarico",
        nextStep: 'Stampa incarico',
        borderColor: '#1E211F',
    },
    {
        status: 'Attiva',
        title: 'Da proporre',
        hint: 'Incarico firmato, nessuna Carer ancora proposta',
        nextStep: 'Apri il matching',
        borderColor: '#C23A22',
    },
    {
        status: 'inProva',
        title: 'In colloquio',
        hint: 'In attesa della scelta della famiglia',
        nextStep: 'Vedi le proposte',
        borderColor: '#1E211F',
    },
]

const regimeLabels = {
    convivente: 'convivente',
    conviventePartTime: 'convivente part-time',
    nonConvivente: 'non convivente',
    notturno: 'notturno',
}

const Dashboard = () => {
    const [requests, setRequests] = useState([])
    const [proposals, setProposals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem('token')
                const headers = { 'Authorization': `Bearer ${token}` }

                const requestsResponse = await fetch(`${URL}/requests`, { headers })
                const requestsResult = await requestsResponse.json()
                if (!requestsResponse.ok) {
                    setErrorMessage(requestsResult.message)
                    return
                }
                setRequests(requestsResult)

                const jobsResponse = await fetch(`${URL}/jobs`, { headers })
                const jobsResult = await jobsResponse.json()
                if (jobsResponse.ok) {
                    setProposals(jobsResult.filter((job) => job.status === 'proposta'))
                }
            } catch (error) {
                setErrorMessage("Server non raggiungibile")
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    const getProposedNames = (requestId) => {
        return proposals
            .filter((proposal) => proposal.request === requestId)
            .map((proposal) => `${proposal.worker?.nome} ${proposal.worker?.lastName}`)
            .join(', ')
    }

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
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h1 className="mb-0">Scrivania</h1>
                {user?.role === 'sede' && (
                    <Link to="/family/new" className="btn btn-primary">+ Nuova Famiglia</Link>
                )}
            </div>

            {/* ================= COLONNE ============== */}
            <Row className="g-4">
                {columns.map((column) => {
                    const columnRequests = requests.filter((request) => request.statusRichiesta === column.status)

                    return (
                        <Col md={4} key={column.status}>
                            <div
                                className="d-flex justify-content-between align-items-baseline pb-2 mb-2"
                                style={{ borderBottom: `2px solid ${column.borderColor}` }}>
                                <h2 className="h5 mb-0">{column.title}</h2>
                                <span className="dashboard-count" style={{ color: column.borderColor }}>
                                    {columnRequests.length}
                                </span>
                            </div>
                            <p className="small text-cl-secondary mb-3">{column.hint}</p>

                            {columnRequests.length === 0
                                ? <p className="small text-cl-secondary">Niente da fare qui.</p>
                                : columnRequests.map((request) => (
                                    <Link
                                        key={request._id}
                                        to={`/request/${request._id}`}
                                        className="dashboard-item d-block bg-cl-surface rounded-2 p-3 mb-2 text-decoration-none">
                                        <span className="d-block fw-semibold text-capitalize text-dark">
                                            {request.famiglia?.customerName} {request.famiglia?.customerLastname}
                                        </span>
                                        <span className="d-block small text-cl-secondary">
                                            <span className="text-capitalize">{request.serviceType}</span>
                                            {' '}{regimeLabels[request.workRequest] ?? request.workRequest}
                                            {' · '}{request.workAddress?.city}
                                        </span>
                                        <span className="d-block small mt-2">
                                            {column.status === 'inProva' && getProposedNames(request._id)
                                                ? <span className="text-cl-secondary text-capitalize">Proposte: {getProposedNames(request._id)}</span>
                                                : <span className="text-cl-primary fw-semibold">{column.nextStep}</span>}
                                        </span>
                                    </Link>
                                ))}
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default Dashboard