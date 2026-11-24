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
    const [serviceFilter, setServiceFilter] = useState('')
    const [cityFilter, setCityFilter] = useState('')

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

    const cities = [...new Set(offers.map((offer) => offer.workAddress?.city?.toLowerCase()).filter(Boolean))].sort()

    const filteredOffers = offers.filter((offer) =>
        (serviceFilter === '' || offer.serviceType === serviceFilter) &&
        (cityFilter === '' || offer.workAddress?.city?.toLowerCase() === cityFilter)
    )

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

                {/* --------------FILTRI------------ */}
                {offers.length > 0 && (
                    <Row className="g-3 mb-4">
                        <Col md={4}>
                            <label htmlFor="serviceFilter" className="form-label small">Categoria</label>
                            <select
                                id="serviceFilter"
                                className="form-select"
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}>
                                <option value="">Tutte</option>
                                <option value="colf">Colf</option>
                                <option value="badante">Badante</option>
                                <option value="babysitter">Babysitter</option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <label htmlFor="cityFilter" className="form-label small">Luogo di lavoro</label>
                            <select
                                id="cityFilter"
                                className="form-select text-capitalize"
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}>
                                <option value="">Tutti</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                )}



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
                    <>
                        <Row className="g-4">
                            {filteredOffers.map((offer) => (
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
                        {filteredOffers.length === 0 && (
                            <p className="text-cl-secondary">Nessuna offerta per questa ricerca.</p>
                        )}
                    </>
                )}
            </Container>
            <ApplicationForm
                offer={selectedOffer}
                onClose={() => setSelectedOffer(null)} />
        </>
    )
}