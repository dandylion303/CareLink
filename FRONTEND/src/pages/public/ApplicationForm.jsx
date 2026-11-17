import { useState } from "react"
import { useForm } from "react-hook-form"
import { Modal, Button, Row, Col } from "react-bootstrap"

const URL = import.meta.env.VITE_API_URL

export const ApplicationForm = ({ offer, onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const [errorMessage, setErrorMessage] = useState('')
    const [isSent, setIsSent] = useState(false)

    const handleClose = () => {
        reset()
        setIsSent(false)
        setErrorMessage('')
        onClose()
    }

    const onSubmit = async (data) => {
        setErrorMessage('')
        try {
            const response = await fetch(`${URL}/public/requests/${offer._id}/apply`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data),
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setIsSent(true)
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile, riprova tra poco")
            console.log(error)
        }
    }

    return (
        <Modal show={offer !== null} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Candidati: <span className="text-capitalize">{offer?.serviceType}</span> a {offer?.workAddress?.city}
                </Modal.Title>
            </Modal.Header>

            {/* ---------- CANDIDATURA INVIATA ---------- */}
            {isSent && (
                <>
                    <Modal.Body>
                        <p className="h5 text-cl-primary">Grazie!</p>
                        <p className="mb-0">La tua candidatura è stata inviata. La sede ti contatterà al più presto.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Chiudi</Button>
                    </Modal.Footer>
                </>
            )}

            {/* ---------- IL FORM ---------- */}
            {!isSent && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <label htmlFor="appName" className="form-label">Nome</label>
                                <input
                                    id="appName"
                                    type="text"
                                    className="form-control"
                                    {...register('name', { required: 'Campo obbligatorio' })}
                                />
                                {errors.name && <p className="text-danger small mb-0">{errors.name.message}</p>}
                            </Col>
                            <Col md={6}>
                                <label htmlFor="appLastName" className="form-label">Cognome</label>
                                <input
                                    id="appLastName"
                                    type="text"
                                    className="form-control"
                                    {...register('lastName', { required: 'Campo obbligatorio' })}
                                />
                                {errors.lastName && <p className="text-danger small mb-0">{errors.lastName.message}</p>}
                            </Col>
                            <Col md={6}>
                                <label htmlFor="appPhone" className="form-label">Telefono</label>
                                <input
                                    id="appPhone"
                                    type="tel"
                                    placeholder="+39..."
                                    className="form-control"
                                    {...register('phone', { required: 'Campo obbligatorio' })}
                                />
                                {errors.phone && <p className="text-danger small mb-0">{errors.phone.message}</p>}
                            </Col>
                            <Col md={6}>
                                <label htmlFor="appEmail" className="form-label">Email (facoltativa)</label>
                                <input
                                    id="appEmail"
                                    type="email"
                                    className="form-control"
                                    {...register('email')}
                                />
                            </Col>
                            <Col md={12}>
                                <label htmlFor="appMessage" className="form-label">Presentati in due righe (facoltativo)</label>
                                <textarea
                                    id="appMessage"
                                    rows="3"
                                    className="form-control"
                                    placeholder="Esperienze, lingue, disponibilità..."
                                    {...register('message')}
                                />
                            </Col>
                            <Col md={12}>
                                <div className="form-check">
                                    <input
                                        id="appPrivacy"
                                        type="checkbox"
                                        className="form-check-input"
                                        {...register('privacyConsent', { required: 'Il consenso è necessario per inviare la candidatura' })}
                                    />
                                    <label htmlFor="appPrivacy" className="form-check-label small">
                                        Acconsento al trattamento dei miei dati personali per essere ricontattata
                                        in merito a questa offerta, ai sensi del Regolamento UE 2016/679 (GDPR).
                                    </label>
                                </div>
                                {errors.privacyConsent && <p className="text-danger small mb-0">{errors.privacyConsent.message}</p>}
                            </Col>
                        </Row>

                        {errorMessage && <p role="alert" className="text-danger mt-3 mb-0">{errorMessage}</p>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="button" variant="outline-secondary" onClick={handleClose}>Annulla</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Invio in corso...' : 'Invia candidatura'}
                        </Button>
                    </Modal.Footer>
                </form>
            )}
        </Modal>
    )
}