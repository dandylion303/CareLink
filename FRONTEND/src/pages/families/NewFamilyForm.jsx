import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const URL = import.meta.env.VITE_API_URL

export const NewFamilyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            codiceFiscale: '',
            customerName: '', customerLastname: '',
            phone: '', email: '',
            customerAddress: {}
        }
    })

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        setErrorMessage('')
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setErrorMessage("Non hai l'autorizzazione per fare questo")
                return
            }
            const response = await fetch(`${URL}/family`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                navigate('/family')
            }

        } catch (error) {
            console.log(error)
            setErrorMessage("C'è stato un errore, contatta l'admin")
        }
    }

    return (
        <Container className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* ==================== ANAGRAFICA ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Anagrafica Cliente</legend>
                    <Row className="g-3">
                        {/* --------------CODICE FISCALE----------------- */}
                        <Col md={12}>
                            <label className="form-label">Codice Fiscale</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('codiceFiscale', { required: 'Campo obbligatorio' })}
                            />
                            {errors.codiceFiscale && <p className="text-danger small mb-0">{errors.codiceFiscale.message}</p>}
                        </Col>
                        {/* --------------NOME----------------- */}
                        <Col md={6}>
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('customerName', { required: 'Campo obbligatorio' })}
                            />
                            {errors.customerName && <p className="text-danger small mb-0">{errors.customerName.message}</p>}
                        </Col>
                        {/* --------------COGNOME----------------- */}
                        <Col md={6}>
                            <label className="form-label">Cognome</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('customerLastname', { required: 'Campo obbligatorio' })}
                            />
                            {errors.customerLastname && <p className="text-danger small mb-0">{errors.customerLastname.message}</p>}
                        </Col>
                    </Row>
                </fieldset>
                {/* ==================== CONTATTI E INDIRIZZO ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Contatti e indirizzo</legend>
                    <Row className="g-3">
                        {/* --------------PHONE----------------- */}
                        <Col md={6}>
                            <label className="form-label">Telefono</label>
                            <input
                                type="tel"
                                className="form-control"
                                {...register('phone', { required: 'Campo obbligatorio' })}
                            />
                            {errors.phone && <p className="text-danger small mb-0">{errors.phone.message}</p>}
                        </Col>
                        {/* --------------EMAIL----------------- */}
                        <Col md={6}>
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-danger small mb-0">{errors.email.message}</p>}
                        </Col>
                        {/* --------------ADDRESS----------------- */}
                        <Col md={6}>
                            <label className="form-label">Indirizzo</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('customerAddress.address', { required: 'Campo obbligatorio' })}
                            />
                            {errors.customerAddress?.address && <p className="text-danger small mb-0">{errors.customerAddress?.address.message}</p>}
                        </Col>
                        {/* --------------CITY----------------- */}
                        <Col md={4}>
                            <label className="form-label">Città</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('customerAddress.city', { required: 'Campo obbligatorio' })}
                            />
                            {errors.customerAddress?.city && <p className="text-danger small mb-0">{errors.customerAddress?.city.message}</p>}
                        </Col>
                        {/* --------------PROVINCE----------------- */}
                        <Col md={2}>
                            <label className="form-label">Provincia</label>
                            <input
                                type="text"
                                placeholder="BA"
                                className="form-control"
                                {...register('customerAddress.provincia', {
                                    required: 'Campo obbligatorio',
                                    minLength: { value: 2, message: 'inserisci la sigla della provincia' },
                                    maxLength: { value: 2, message: 'inserisci la sigla della provincia' }
                                })}
                            />
                            {errors.customerAddress?.provincia && <p className="text-danger small mb-0">{errors.customerAddress?.provincia.message}</p>}
                        </Col>
                    </Row>
                </fieldset>
                {/* --------------PRIVACY----------------- */}
                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('privacyConsent.gdpr', { required: 'Il consenso è obbligatorio' })}
                        />
                        <label className="form-check-label">
                            Il Cliente ha firmato il consenso al trattamento dei dati
                        </label>
                    </div>
                    {errors.privacyConsent?.gdpr && (
                        <p className="text-danger small mb-0">{errors.privacyConsent.gdpr.message}</p>
                    )}
                </div>

                <Button type="submit" className="mt-3 w-100">Submit</Button>
                {errorMessage.length > 0 && <p role='alert' className='text-danger'>{errorMessage}</p>}

            </form>

        </Container>




    )


}