import { Container, Row, Col, Spinner, Button, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { StepDettaglio } from "../../components/RequestForm/StepDettaglio"
import { StepBase } from "../../components/RequestForm/StepBase"
import { StepColf } from "../../components/RequestForm/StepColf"
import { StepBabysitter } from "../../components/RequestForm/StepBabysitter"
import { StepBadante } from "../../components/RequestForm/StepBadante"
import { StepRichiesteSpecifiche } from "../../components/RequestForm/StepRichiesteSpecifiche"
import { StepGestioneIntermediazione } from "../../components/RequestForm/StepGestioneIntermediazione"

const URL = import.meta.env.VITE_API_URL

const toInputDate = (date) => (date ? date.slice(0, 10) : '')


export const RequestEdit = () => {
    const { id } = useParams()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [family, setFamily] = useState(null)
    const [originalLevel, setOriginalLevel] = useState('')

    const serviceType = watch('serviceType')
    const selectedLevel = watch('livello')
    const isLevelChanged = selectedLevel !== originalLevel

    const getRequest = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/requests/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setFamily(result.famiglia)
                setOriginalLevel(result.livello)
                reset({
                    ...result,
                    startDate: toInputDate(result.startDate),
                    endDate: toInputDate(result.endDate),
                })
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setErrorMessage('')
        // Questi campi li gestisce il database: non vanno rimandati
        const { _id, __v, createdAt, updatedAt, famiglia, sede, ...dataToSend } = data
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/requests/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
                console.log(result.errors)
            } else {
                navigate(`/request/${id}`)
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)
        }
    }

    useEffect(() => {
        getRequest()
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
        <Container>
            <h1 className="mb-0">
                Modifica richiesta di
                <span className="text-cl-primary"> {family.customerName} {family.customerLastname}</span>
            </h1>
            <p className="text-cl-secondary mb-4">Contatti: {family.phone} - {family.email}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StepBase register={register} errors={errors} watch={watch} />
                <StepDettaglio register={register} errors={errors} watch={watch} />

                {serviceType === 'colf' && <StepColf register={register} errors={errors} watch={watch} />}
                {serviceType === 'babysitter' && <StepBabysitter register={register} errors={errors} watch={watch} />}
                {serviceType === 'badante' && <StepBadante register={register} errors={errors} watch={watch} />}

                <StepRichiesteSpecifiche register={register} errors={errors} watch={watch} />
                <StepGestioneIntermediazione register={register} errors={errors} watch={watch} />

                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                    <legend className="h5 mb-3">Inquadramento e stato</legend>
                    <p className="small text-cl-secondary">Il livello è stato calcolato dalle risposte: puoi modificarlo se la famiglia sceglie diversamente.</p>
                    <Row className="g-3">
                        <Col md={4}>
                            <label className="form-label">Tabella CCNL</label>
                            <select className="form-select" {...register('inquadramento')}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="G">G</option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <label className="form-label">Livello</label>
                            <select className="form-select" {...register('livello')}>
                                <option value="A">A</option>
                                <option value="AS">AS</option>
                                <option value="B">B</option>
                                <option value="BS">BS</option>
                                <option value="C">C</option>
                                <option value="CS">CS</option>
                                <option value="D">D</option>
                                <option value="DS">DS</option>
                                <option value="livelloUnico">Livello unico</option>
                            </select>
                            {isLevelChanged && (
                                <Alert variant="warning" className="mt-2 mb-0 small">
                                    Il livello proposto era {originalLevel}: verifica che quello scelto corrisponda alle mansioni reali.
                                </Alert>
                            )}
                        </Col>
                        <Col md={4}>
                            <label className="form-label">Stato</label>
                            <select className="form-select" {...register('statusRichiesta')}>
                                <option value="inAttesa">In attesa</option>
                                <option value="Attiva">Attiva</option>
                                <option value="inProva">In prova</option>
                                <option value="Chiusa">Chiusa</option>
                            </select>
                        </Col>
                    </Row>
                </fieldset>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Button type="submit" className="mb-5">Salva modifiche</Button>


            </form>
        </Container>

    )
}