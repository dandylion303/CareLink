import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Spinner, Row, Col, Button } from 'react-bootstrap'
import { ArrowLeft } from "lucide-react"

const URL = import.meta.env.VITE_API_URL
const regimeLabels = {
    convivente: 'Convivente',
    conviventePartTime: 'Convivente part-time',
    nonConvivente: 'Non convivente',
    notturno: 'Notturno',
}


export const CarerDetailPage = () => {
    const { id } = useParams()
    const [carer, setCarer] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [flagReason, setFlagReason] = useState('')
    const [actionError, setActionError] = useState('')

    const getCarer = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setErrorMessage("Non hai l'autorizzazione per fare questo")
                return
            }
            const response = await fetch(`${URL}/carers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setCarer(result)
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateFlag = async (isFlagged) => {
        setActionError('')
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/carers/${id}/flag`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ isFlagged, reason: flagReason })
            })
            const result = await response.json()
            if (!response.ok) {
                setActionError(result.message)
            } else {
                setCarer(result)
                setFlagReason('')
            }
        } catch (error) {
            setActionError('Server non raggiungibile')
            console.log(error)
        }
    }

    useEffect(() => {
        getCarer()
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



    const listOrDash = (list) => (list?.length > 0 ? list.join(', ') : '—')

    return (
        <>
            <Link to="/carers" className="small d-inline-flex align-items-center gap-1 mb-3">
                <ArrowLeft size={16} aria-hidden="true" /> Torna alle Carer
            </Link>

            {/* ---------- INTESTAZIONE ---------- */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <h1 className="mb-0 text-capitalize">{carer.nome} {carer.lastName}</h1>
                {carer.status === 'disponibile'
                    ? <span className="badge rounded-pill badge-positive px-3 py-2">Disponibile</span>
                    : <span className="badge rounded-pill badge-negative px-3 py-2">Non disponibile</span>}
                {carer.warning?.isFlagged && (
                    <span className="badge rounded-pill bg-danger px-3 py-2">Segnalata</span>
                )}
            </div>

            <Row className="g-4 mb-4">
                {/* ---------- CONTATTI ---------- */}
                <Col md={6}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                        <h2 className="h5 mb-3">Contatti</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Telefono:</span> <a href={`tel:${carer.phone}`}>{carer.phone}</a></p>
                        <p className="mb-1"><span className="text-cl-secondary">Email:</span> {carer.email || '—'}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Indirizzo:</span> {carer.address}, <span className="text-capitalize">{carer.city}</span> ({carer.province})</p>
                    </div>
                </Col>

                {/* ---------- LAVORO CERCATO ---------- */}
                <Col md={6}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                        <h2 className="h5 mb-3">Lavoro cercato</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Lavori:</span> <span className="text-capitalize">{listOrDash(carer.jobTypes)}</span></p>
                        <p className="mb-1"><span className="text-cl-secondary">Regimi:</span> {listOrDash(carer.regimes?.map((regime) => regimeLabels[regime] ?? regime))}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Disponibile per:</span> {listOrDash(carer.availableFor)}</p>
                    </div>
                </Col>

                {/* ---------- ESPERIENZA E COMPETENZE ---------- */}
                <Col md={6}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                        <h2 className="h5 mb-3">Esperienza e competenze</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Esperienza con:</span> {listOrDash(carer.experienceWith)}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Competenze:</span> {listOrDash(carer.skills)}</p>
                    </div>
                </Col>

                {/* ---------- SITUAZIONE PERSONALE ---------- */}
                <Col md={6}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4 h-100">
                        <h2 className="h5 mb-3">Situazione personale</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Anni in Italia:</span> {carer.yearsInItaly ?? '—'}</p>
                        <p className="mb-1"><span className="text-cl-secondary">Patente:</span> {carer.hasDrivingLicense ? 'Sì' : 'No'} · <span className="text-cl-secondary">Auto:</span> {carer.hasCar ? 'Sì' : 'No'}</p>
                        <p className="mb-1"><span className="text-cl-secondary">Fuma:</span> {carer.smoker ? 'Sì' : 'No'}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Animali accettati:</span> {listOrDash(carer.acceptedPets)}</p>
                    </div>
                </Col>

                {/* ---------- VALUTAZIONE DELLA SEDE ---------- */}
                <Col md={12}>
                    <div className="bg-cl-surface border border-cl rounded-3 p-4">
                        <h2 className="h5 mb-3">Valutazione della sede</h2>
                        <p className="mb-1"><span className="text-cl-secondary">Voto:</span> {carer.rating != null ? `${carer.rating}/10` : 'non ancora assegnato'}</p>
                        <p className="mb-1"><span className="text-cl-secondary">Referenze:</span> {carer.hasReferences ? 'Sì' : 'No'}</p>
                        <p className="mb-0"><span className="text-cl-secondary">Note:</span> {carer.notes || '—'}</p>
                    </div>
                </Col>
                {/* ---------- SEGNALAZIONE ---------- */}
                <section className="border-top border-cl pt-4">
                    <h2 className="h5 mb-3">Segnalazione</h2>

                    {carer.warning?.isFlagged ? (
                        <div className="bg-cl-negative rounded-3 p-3">
                            <p className="fw-semibold mb-1">Questa Carer è segnalata e non compare nel matching.</p>
                            <p className="mb-1">Motivo: {carer.warning.reason}</p>
                            {carer.warning.flaggedAt && (
                                <p className="small mb-3">Segnalata il {new Date(carer.warning.flaggedAt).toLocaleDateString('it-IT')}</p>
                            )}
                            <Button variant="outline-secondary" onClick={() => updateFlag(false)}>
                                Rimuovi la segnalazione
                            </Button>
                        </div>
                    ) : (
                        <div style={{ maxWidth: 560 }}>
                            <label htmlFor="flagReason" className="form-label">
                                Se ci sono stati problemi con questa Carer, scrivi il motivo:
                            </label>
                            <textarea
                                id="flagReason"
                                rows="3"
                                className="form-control mb-3"
                                value={flagReason}
                                onChange={(event) => setFlagReason(event.target.value)}
                            />
                            <Button
                                variant="outline-danger"
                                disabled={flagReason.trim() === ''}
                                onClick={() => updateFlag(true)}>
                                Segnala
                            </Button>
                        </div>
                    )}

                    {actionError && <p className="text-danger mt-3 mb-0">{actionError}</p>}
                </section>


            </Row>

        </>
    )
}