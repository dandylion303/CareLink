import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const URL = import.meta.env.VITE_API_URL

export const NewCarerForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            codiceFiscale: '',
            nome: '', lastName: '',
            gender: '',
            birthdate: '', birthCountry: '', citizenship: '',
            phone: '',
            email: '',
            province: '', city: '', address: '',
            jobTypes: [], regimes: [], availableFor: [], experienceWith: [], skills: [],
            acceptedPets: [],
            smoker: false, hasCar: false,
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
            const response = await fetch(`${URL}/carers`, {
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
                navigate('/carers')
            }

        } catch (error) {
            console.log(error)
            setErrorMessage("C'è stato un errore, contatta l'admin")
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="bg-cl-surface, border, border-cl, rounded-3, p-5 mb-5">
                            <legend>Anagrafica</legend>
                            {/* --------------CODICE FISCALE----------------- */}
                            <div>
                                <label className="form-label">Codice Fiscale</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('codiceFiscale', { required: 'Campo obbligatorio' })}
                                />
                                {errors.codiceFiscale && <p className="text-danger small">{errors.codiceFiscale.message}</p>}
                            </div>
                            {/* --------------NOME----------------- */}

                            <div>
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('nome', { required: 'Campo obbligatorio' })}
                                />
                                {errors.nome && <p className="text-danger small">{errors.nome.message}</p>}
                            </div>
                            {/* --------------COGNOME----------------- */}
                            <div>
                                <label className="form-label">Cognome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('lastName', { required: 'Campo obbligatorio' })}
                                />
                                {errors.lastName && <p className="text-danger small">{errors.lastName.message}</p>}
                            </div>
                            {/* --------------GENDER----------------- */}
                            <div>
                                <label className="form-label">Sesso</label>
                                <select
                                    className="form-select"
                                    {...register('gender', { required: 'Campo obbligatorio' })}>
                                    <option value="">Seleziona</option>
                                    <option value="F">Donna</option>
                                    <option value="M">Uomo</option>
                                    <option value="Other">Altro</option>
                                </select>
                                {errors.gender && <p className="text-danger small">{errors.gender.message}</p>}
                            </div>
                            {/* --------------BIRTHDATE----------------- */}
                            <div>
                                <label className="form-label">Data di nascita</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register('birthdate', { required: 'Campo obbligatorio' })}
                                />
                                {errors.birthdate && <p className="text-danger small">{errors.birthdate.message}</p>}
                            </div>
                            {/* --------------BIRTHCOUNTRY----------------- */}
                            <div>
                                <label className="form-label">Stato di Nascita</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('birthCountry', { required: 'Campo obbligatorio' })}
                                />
                                {errors.birthCountry && <p className="text-danger small">{errors.birthCountry.message}</p>}
                            </div>
                            {/* --------------CITIZENSHIP----------------- */}
                            <div>
                                <label className="form-label">Cittadinanza</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('citizenship', { required: 'Campo obbligatorio' })}
                                />
                                {errors.citizenship && <p className="text-danger small">{errors.citizenship.message}</p>}
                            </div>
                        </fieldset>

                         <fieldset>
                            <legend>Contatti</legend>
                        {/* --------------PHONE----------------- */}
                        <div>
                            <label className="form-label">Telefono</label>
                            <input
                                type="tel"
                                className="form-control"
                                {...register('phone', { required: 'Campo obbligatorio' })}
                            />
                            {errors.phone && <p className="text-danger small">{errors.phone.message}</p>}
                        </div>
                        {/* --------------EMAIL----------------- */}
                        <div>
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
                        </div>
                        </fieldset>

                         <fieldset>
                            <legend>Residenza</legend>
                        {/* --------------PROVINCE----------------- */}
                        <div>
                            <label className="form-label">Provincia</label>
                            <input
                                type="text"
                                placeholder="BA"
                                className="form-control"
                                {...register('province', { required: 'Campo obbligatorio', minLength: 2, maxLength: { value: 2, message: 'inserisci la sigla della provincia' } })}
                            />
                            {errors.province && <p className="text-danger small">{errors.province.message}</p>}
                        </div>
                        {/* --------------CITY----------------- */}
                        <div>
                            <label className="form-label">Città</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('city', { required: 'Campo obbligatorio' })}
                            />
                            {errors.city && <p className="text-danger small">{errors.city.message}</p>}
                        </div>
                        {/* --------------ADDRESS----------------- */}
                        <div>
                            <label className="form-label">Indirizzo</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('address', { required: 'Campo obbligatorio' })}
                            />
                            {errors.address && <p className="text-danger small">{errors.address.message}</p>}
                        </div>
                        </fieldset>


                        {/* --------------JOBTYPES----------------- */}
                        <div>
                            <label className="form-label">Tipo di Lavoro</label>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='badante'
                                    className="form-check-input"
                                    {...register('jobTypes', { required: 'Campo obbligatorio' })}
                                />
                                <label className="form-check-label">Badante</label>

                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='colf'
                                    className="form-check-input"
                                    {...register('jobTypes')}
                                />
                                <label className="form-check-label">Colf</label>

                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='babysitter'
                                    className="form-check-input"
                                    {...register('jobTypes')}
                                />
                                <label className="form-check-label">BabySitter</label>

                            </div>
                            {errors.jobTypes && <p className="text-danger small">{errors.jobTypes.message}</p>}
                        </div>

                        {/* --------------REGIMES----------------- */}
                        <div>
                            <label className="form-label">Regime</label>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='convivente'
                                    className="form-check-input"
                                    {...register('regimes', { required: 'Campo obbligatorio' })}
                                />
                                <label className="form-check-label">Convivente</label>

                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='nonConvivente'
                                    className="form-check-input"
                                    {...register('regimes')}
                                />
                                <label className="form-check-label">Non Convivente</label>

                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='conviventePartTime'
                                    className="form-check-input"
                                    {...register('regimes')}
                                />
                                <label className="form-check-label">Convivente Part-Time (art.15)</label>

                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox" value='notturno'
                                    className="form-check-input"
                                    {...register('regimes')}
                                />
                                <label className="form-check-label">Notturno</label>

                            </div>
                            {errors.regimes && <p className="text-danger small">{errors.regimes.message}</p>}
                        </div>


                        {/* --------------ANNI IN ITALIA----------------- */}
                        <div>
                            <label className="form-label">Anni in Italia</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register('yearsInItaly', { valueAsNumber: true, required: 'Campo obbligatorio' })}
                            />
                            {errors.yearsInItaly && <p className="text-danger small">{errors.yearsInItaly.message}</p>}
                        </div>
                        {/* --------------PRIVACY----------------- */}
                        <div className="mt-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    {...register('privacyConsent.gdpr', { required: 'Il consenso è obbligatorio' })}
                                />
                                <label className="form-check-label">
                                    Carer ha firmato il consenso al trattamento dei dati
                                </label>
                            </div>
                            {errors.privacyConsent?.gdpr && (
                                <p className="text-danger small">{errors.privacyConsent.gdpr.message}</p>
                            )}
                        </div>




                        <Button type="submit" className="mt-3 w-100">Submit</Button>
                        {errorMessage.length > 0 && <p role='alert' className='text-danger'>{errorMessage}</p>}
                    </form>
                </Col>
            </Row>
        </Container >

    )

}