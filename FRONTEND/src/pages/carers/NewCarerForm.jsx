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
            smoker: false, hasCar: false, hasDrivingLicense: false, hasReferences: false,
            notes: '',
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
        <Container className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* ==================== ANAGRAFICA ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Anagrafica</legend>
                    <Row className="g-3">
                        {/* --------------CODICE FISCALE----------------- */}
                        <Col md={6}>
                            <label className="form-label">Codice Fiscale</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('codiceFiscale', { required: 'Campo obbligatorio' })}
                            />
                            {errors.codiceFiscale && <p className="text-danger small mb-0">{errors.codiceFiscale.message}</p>}
                        </Col>
                        {/* --------------GENDER----------------- */}
                        <Col md={6}>
                            <label className="form-label">Sesso</label>
                            <select
                                className="form-select"
                                {...register('gender', { required: 'Campo obbligatorio' })}>
                                <option value="">Seleziona</option>
                                <option value="F">Donna</option>
                                <option value="M">Uomo</option>
                                <option value="Other">Altro</option>
                            </select>
                            {errors.gender && <p className="text-danger small mb-0">{errors.gender.message}</p>}
                        </Col>
                        {/* --------------NOME----------------- */}
                        <Col md={6}>
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('nome', { required: 'Campo obbligatorio' })}
                            />
                            {errors.nome && <p className="text-danger small mb-0">{errors.nome.message}</p>}
                        </Col>
                        {/* --------------COGNOME----------------- */}
                        <Col md={6}>
                            <label className="form-label">Cognome</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('lastName', { required: 'Campo obbligatorio' })}
                            />
                            {errors.lastName && <p className="text-danger small mb-0">{errors.lastName.message}</p>}
                        </Col>
                        {/* --------------BIRTHDATE----------------- */}
                        <Col md={4}>
                            <label className="form-label">Data di nascita</label>
                            <input
                                type="date"
                                className="form-control"
                                {...register('birthdate', { required: 'Campo obbligatorio' })}
                            />
                            {errors.birthdate && <p className="text-danger small mb-0">{errors.birthdate.message}</p>}
                        </Col>
                        {/* --------------BIRTHCOUNTRY----------------- */}
                        <Col md={4}>
                            <label className="form-label">Paese di Nascita</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('birthCountry', { required: 'Campo obbligatorio' })}
                            />
                            {errors.birthCountry && <p className="text-danger small mb-0">{errors.birthCountry.message}</p>}
                        </Col>
                        {/* --------------CITIZENSHIP----------------- */}
                        <Col md={4}>
                            <label className="form-label">Cittadinanza</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('citizenship', { required: 'Campo obbligatorio' })}
                            />
                            {errors.citizenship && <p className="text-danger small mb-0">{errors.citizenship.message}</p>}
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
                                {...register('address', { required: 'Campo obbligatorio' })}
                            />
                            {errors.address && <p className="text-danger small mb-0">{errors.address.message}</p>}
                        </Col>
                        {/* --------------CITY----------------- */}
                        <Col md={4}>
                            <label className="form-label">Città</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('city', { required: 'Campo obbligatorio' })}
                            />
                            {errors.city && <p className="text-danger small mb-0">{errors.city.message}</p>}
                        </Col>
                        {/* --------------PROVINCE----------------- */}
                        <Col md={2}>
                            <label className="form-label">Provincia</label>
                            <input
                                type="text"
                                placeholder="BA"
                                className="form-control"
                                {...register('province', {
                                    required: 'Campo obbligatorio',
                                    minLength: { value: 2, message: 'inserisci la sigla della provincia' },
                                    maxLength: { value: 2, message: 'inserisci la sigla della provincia' }
                                })}
                            />
                            {errors.province && <p className="text-danger small mb-0">{errors.province.message}</p>}
                        </Col>
                    </Row>
                </fieldset>

                {/* ==================== LAVORO CERCATO ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Lavoro cercato</legend>

                    {/* --------------JOBTYPES----------------- */}
                    <div className="mb-3">
                        <label className="form-label d-block">Tipo di Lavoro</label>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='badante'
                                className="form-check-input"
                                {...register('jobTypes', { required: 'Campo obbligatorio' })}
                            />
                            <label className="form-check-label">Badante</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='colf'
                                className="form-check-input"
                                {...register('jobTypes')}
                            />
                            <label className="form-check-label">Colf</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='babysitter'
                                className="form-check-input"
                                {...register('jobTypes')}
                            />
                            <label className="form-check-label">BabySitter</label>
                        </div>
                        {errors.jobTypes && <p className="text-danger small mb-0">{errors.jobTypes.message}</p>}
                    </div>

                    {/* --------------REGIMES----------------- */}
                    <div className="mb-3">
                        <label className="form-label d-block">Regime</label>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='convivente'
                                className="form-check-input"
                                {...register('regimes', { required: 'Campo obbligatorio' })}
                            />
                            <label className="form-check-label">Convivente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='nonConvivente'
                                className="form-check-input"
                                {...register('regimes')}
                            />
                            <label className="form-check-label">Non Convivente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='conviventePartTime'
                                className="form-check-input"
                                {...register('regimes')}
                            />
                            <label className="form-check-label">Convivente Part-Time (art.15)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='notturno'
                                className="form-check-input"
                                {...register('regimes')}
                            />
                            <label className="form-check-label">Notturno</label>
                        </div>
                        {errors.regimes && <p className="text-danger small mb-0">{errors.regimes.message}</p>}
                    </div>

                    {/* --------------AVAILABLE FOR----------------- */}
                    <div>
                        <label className="form-label d-block">Disponibile per</label>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='weekend'
                                className="form-check-input"
                                {...register('availableFor')}
                            />
                            <label className="form-check-label">Weekend</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='sostituzioni'
                                className="form-check-input"
                                {...register('availableFor')}
                            />
                            <label className="form-check-label">Sostituzioni</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox" value='sforziFisici'
                                className="form-check-input"
                                {...register('availableFor')}
                            />
                            <label className="form-check-label">Sforzi fisici</label>
                        </div>
                    </div>
                </fieldset>

                {/* ==================== ESPERIENZE E COMPETENZE ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Esperienze e competenze</legend>

                    {/* --------------EXPERIENCE WITH----------------- */}
                    <div className="mb-3">
                        <label className="form-label d-block">Esperienza con</label>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='neonati' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Neonati</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='bambini' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Bambini</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='anziani' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Anziani</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='allettati' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Allettati</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='alzheimerDemenza' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Alzheimer e demenza</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='oncologici' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Oncologici</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='PEG' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">PEG</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='autismo' className="form-check-input" {...register('experienceWith')} />
                            <label className="form-check-label">Autismo</label>
                        </div>
                    </div>

                    {/* --------------SKILLS----------------- */}
                    <div>
                        <label className="form-label d-block">Competenze</label>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='punture' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Punture</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='pressione' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Pressione</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='glicemia' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Glicemia</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='cucinare' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Cucinare</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='stirare' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Stirare</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='giardinaggio' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Giardinaggio</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='sollevatore' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Sollevatore</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='ossigeno' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Ossigeno</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" value='giocareACarte' className="form-check-input" {...register('skills')} />
                            <label className="form-check-label">Giocare a carte</label>
                        </div>
                    </div>
                </fieldset>

                {/* ==================== SITUAZIONE PERSONALE ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Situazione personale</legend>
                    <Row className="g-3">
                        {/* --------------ANNI IN ITALIA----------------- */}
                        <Col md={3}>
                            <label className="form-label">Anni in Italia</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register('yearsInItaly', { valueAsNumber: true, required: 'Campo obbligatorio' })}
                            />
                            {errors.yearsInItaly && <p className="text-danger small mb-0">{errors.yearsInItaly.message}</p>}
                        </Col>
                        <Col md={9}>
                            {/* --------------PATENTE, AUTO, FUMO----------------- */}
                            <label className="form-label d-block">Patente, auto e fumo</label>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" {...register('hasDrivingLicense')} />
                                <label className="form-check-label">Ha la patente</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" {...register('hasCar')} />
                                <label className="form-check-label">Ha l'auto</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" {...register('smoker')} />
                                <label className="form-check-label">Fuma</label>
                            </div>

                            {/* --------------ACCEPTED PETS----------------- */}
                            <label className="form-label d-block mt-3">Accetta animali</label>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" value='cani' className="form-check-input" {...register('acceptedPets')} />
                                <label className="form-check-label">Cani</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" value='gatti' className="form-check-input" {...register('acceptedPets')} />
                                <label className="form-check-label">Gatti</label>
                            </div>
                        </Col>
                    </Row>
                </fieldset>

                {/* ==================== VALUTAZIONE DELLA SEDE ==================== */}
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                    <legend className="h5 mb-3">Valutazione della sede</legend>
                    <Row className="g-3">
                        {/* --------------RATING----------------- */}
                        <Col md={3}>
                            <label className="form-label">Valutazione (0-10)</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register('rating', {
                                    valueAsNumber: true,
                                    min: { value: 0, message: 'Inserisci un numero da 0 a 10' },
                                    max: { value: 10, message: 'Inserisci un numero da 0 a 10' }
                                })}
                            />
                            {errors.rating && <p className="text-danger small mb-0">{errors.rating.message}</p>}
                        </Col>
                        {/* --------------REFERENCES----------------- */}
                        <Col md={9} className="d-flex align-items-end">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" {...register('hasReferences')} />
                                <label className="form-check-label">Ha referenze</label>
                            </div>
                        </Col>
                        {/* --------------NOTES----------------- */}
                        <Col xs={12}>
                            <label className="form-label">Note</label>
                            <textarea
                                rows={4}
                                className="form-control"
                                {...register('notes')}
                            />
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
                            Carer ha firmato il consenso al trattamento dei dati
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