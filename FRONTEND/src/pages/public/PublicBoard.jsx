import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Spinner, Button } from "react-bootstrap"
import { ApplicationForm } from "./ApplicationForm"

const URL = import.meta.env.VITE_API_URL

// conversione testi
const regimeLabels = {
    convivente: 'Convivente',
    conviventePartTime: 'Convivente part-time',
    nonConvivente: 'Non convivente',
    notturno: 'Notturno',
}

const formatDate = (date) => new Date(date).toLocaleDateString('it-IT')

export const PublicBoard = () => {
    const [offers, setOffers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedOffer, setSelectedOffer] = useState(null)

    useEffect(() => {
        const getOffers = async () => {
            try {
                const response = await fetch(`${URL}/public/requests`)
                const result = await response.json()
                if (!response.ok) {
                    setErrorMessage(result.message)
                } else {
                    setOffers(result)
                }
            } catch (error) {
                setErrorMessage("Server non raggiungibile")
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getOffers()
    }, [])

    return (
        <>
            <header className="mainHeader d-flex justify-content-between align-items-center px-4 py-3">
                <span className="h1 mb-0">
                    <Link to="/bacheca" className="logo">
                        Care<em className="text-cl-primary">Link</em>
                    </Link>
                </span>
                <Link to="/" className="btn btn-outline-secondary">Area riservata</Link>
            </header>

            <Container className="py-4">
                <h1 className="mb-1">Offerte di lavoro</h1>
                <p className="text-cl-secondary mb-4">
                    Cerchiamo colf, badanti e babysitter per le famiglie che si affidano a noi.
                </p>

                {/* ---------- LOADING ---------- */}
                {isLoading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </Spinner>
                    </div>
                )}

                {/* ---------- ERRORE ---------- */}
                {!isLoading && errorMessage && (
                    <div className="bg-cl-negative p-3 rounded-3">
                        <p className="mb-0">{errorMessage}</p>
                    </div>
                )}

                {/* ---------- NESSUN ANNUNCIO ---------- */}
                {!isLoading && !errorMessage && offers.length === 0 && (
                    <p className="text-cl-secondary">Al momento non ci sono offerte aperte. Torna a trovarci presto!</p>
                )}

                {/* ---------- ANNUNCI ---------- */}
                {!isLoading && !errorMessage && offers.length > 0 && (
                    <Row className="g-4">
                        {offers.map((offer) => (
                            <Col md={6} key={offer._id}>
                                <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100 d-flex flex-column">
                                    <h2 className="h4 mb-1">
                                        <span className="text-capitalize">{offer.serviceType}</span> a {offer.workAddress?.city}
                                    </h2>
                                    <p className="small text-cl-secondary mb-3">
                                        {regimeLabels[offer.workRequest] ?? offer.workRequest}
                                        {' · '}{offer.oreSettimanali} ore settimanali
                                        {' · '}livello {offer.livello}
                                        {offer.startDate && <>{' · '}dal {formatDate(offer.startDate)}</>}
                                    </p>

                                    <p className="flex-grow-1">{offer.publicDescription}</p>

                                    <div>
                                        <Button onClick={() => setSelectedOffer(offer)}>Candidati</Button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <ApplicationForm
                offer={selectedOffer}
                onClose={() => setSelectedOffer(null)} />
        </>
    )
}