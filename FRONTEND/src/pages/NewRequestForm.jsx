import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from 'lucide-react'

const URL = import.meta.env.VITE_API_URL

export const NewRequestForm = () => {
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors }
    } = useForm()

    const [step, setStep] = useState(1)

    const goToNextStep = async () => {
        const validStep = await trigger(fieldsInStep[step])
        if (validStep === true) {
            setStep(step + 1)
        }
    }
    const goToPreviousStep = () => {
        setStep(step - 1)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    const fieldsInStep = {
        1: ['serviceType', 'workRequest'],
        2: ['oreSettimanali', 'durationType', 'startDate', 'endDate', 'workAddress.address', 'workAddress.city', 'workAddress.provincia'],
        3: ['colfDetails.experienceLevel', 'colfDetails.otherStaff', 'colfDetails.specificSkillsNeeded'],
    }

    const durationType = watch('durationType')
    const serviceType = watch('serviceType')
    const experienceLevel = watch('colfDetails.experienceLevel')
    const otherStaff = watch('colfDetails.otherStaff')
    const specificSkillsNeeded = watch('colfDetails.specificSkillsNeeded')

    const hoursLimits = {
        convivente: { min: 25, max: 54, label: 'convivente' },
        notturno: { min: 25, max: 54, label: 'notturno' },
        conviventePartTime: { min: 25, max: 30, label: 'convivente Part-Time' },
        nonConvivente: { min: 1, max: 40, label: 'Non Convivente' },
    }

    
        return (
    <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Nuova Richiesta</h1>

            {/* ================= PAGINA 1 // SCELTA TIPOLOGIA + REGIME ============= */}
            {step === 1 && (
                <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                    <legend className="h5 mb-3">Servizio richiesto</legend>
                    <Row className="g-3">
                        <Col md={6}>
                            <label className="form-label">Scegli la mansione</label>
                            <select
                                className="form-select"
                                {...register('serviceType', { required: 'Campo obbligatorio' })}>
                                <option value="">Seleziona</option>
                                <option value="colf">Colf</option>
                                <option value="badante">Badante</option>
                                <option value="babysitter">BabySitter</option>
                            </select>
                            {errors.serviceType && <p className='text-danger small mb-0'>{errors.serviceType.message}</p>}
                        </Col>

                        <Col md={6}>
                            <label className="form-label">Scegli il regime</label>
                            <select
                                className="form-select"
                                {...register('workRequest', {
                                    required: 'Campo obbligatorio',
                                    validate: (value, formValues) => {
                                        if (value === 'notturno' && formValues.serviceType !== 'badante') {
                                            return 'Il regime notturno è previsto solo per le badanti'
                                        }
                                        return true
                                    }
                                })}>
                                <option value="">Seleziona</option>
                                <option value="convivente">Convivente</option>
                                <option value="nonConvivente">Non Convivente</option>
                                <option value="conviventePartTime">Convivente Part Time</option>
                                {serviceType === 'badante' && (<option value="notturno">Notturno</option>)}
                            </select>
                            {errors.workRequest && <p className='text-danger small mb-0'>{errors.workRequest.message}</p>}
                        </Col>
                    </Row>
                </fieldset>
            )}

            {/* ============== PAGINA 2 // SCELTA ORARI + LUOGO ================= */}
            {step === 2 && (
                <>
                    {/* -------// RAPPORTO DI LAVORO //----- */}
                    <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                        <legend className="h5 mb-3">Rapporto di lavoro</legend>
                        <Row className="g-3">
                            <Col md={6}>
                                <label className="form-label">Ore Settimanali</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    {...register('oreSettimanali', {
                                        valueAsNumber: true,
                                        required: 'Campo obbligatorio',
                                        validate: (value, formValues) => {
                                            const limits = hoursLimits[formValues.workRequest]
                                            if (value < limits.min || value > limits.max) {
                                                return `Per un contratto in regime ${limits.label} le ore vanno da ${limits.min} a ${limits.max}`
                                            }
                                            return true
                                        }
                                    })}
                                />
                                {errors.oreSettimanali && <p className='text-danger small mb-0'>{errors.oreSettimanali.message}</p>}
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Durata del rapporto</label>
                                <select
                                    className="form-select"
                                    {...register('durationType', { required: 'Campo obbligatorio' })}>
                                    <option value="indeterminato">Indeterminato</option>
                                    <option value="determinato">Determinato</option>
                                </select>
                                {errors.durationType && <p className='text-danger small mb-0'>{errors.durationType.message}</p>}
                            </Col>

                            <Col md={6}>
                                <label className="form-label">Data di Inizio Rapporto</label>
                                <input
                                    className="form-control"
                                    type='date'
                                    {...register('startDate', { required: 'Campo obbligatorio' })}
                                />
                                {errors.startDate && <p className='text-danger small mb-0'>{errors.startDate.message}</p>}
                            </Col>

                            {durationType === 'determinato' && (
                                <Col md={6}>
                                    <label className="form-label">Data di Fine Rapporto</label>
                                    <input
                                        className="form-control"
                                        type='date'
                                        {...register('endDate', { required: 'Campo obbligatorio per rapporti a tempo determinato' })}
                                    />
                                    {errors.endDate && <p className='text-danger small mb-0'>{errors.endDate.message}</p>}
                                </Col>
                            )}
                        </Row>
                    </fieldset>

                    {/* -------// LUOGO DI LAVORO //------ */}
                    <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 mb-4">
                        <legend className="h5 mb-3">Luogo di lavoro</legend>
                        <Row className="g-3">
                            <Col md={12}>
                                <label className="form-label">Indirizzo</label>
                                <input
                                    className="form-control"
                                    type='text'
                                    {...register('workAddress.address', { required: 'Campo obbligatorio' })}
                                />
                                {errors.workAddress?.address && <p className='text-danger small mb-0'>{errors.workAddress.address.message}</p>}
                            </Col>
                            <Col md={8}>
                                <label className="form-label">Città</label>
                                <input
                                    className="form-control"
                                    type='text'
                                    {...register('workAddress.city', { required: 'Campo obbligatorio' })}
                                />
                                {errors.workAddress?.city && <p className='text-danger small mb-0'>{errors.workAddress.city.message}</p>}
                            </Col>
                            <Col md={4}>
                                <label className="form-label">Provincia</label>
                                <input
                                    className="form-control"
                                    type='text'
                                    placeholder="BO"
                                    {...register('workAddress.provincia', {
                                        required: 'Campo obbligatorio',
                                        minLength: { value: 2, message: 'Inserisci la sigla della provincia' },
                                        maxLength: { value: 2, message: 'Inserisci la sigla della provincia' }
                                    })}
                                />
                                {errors.workAddress?.provincia && <p className='text-danger small mb-0'>{errors.workAddress.provincia.message}</p>}
                            </Col>
                        </Row>
                    </fieldset>
                </>
            )}

            {/* ================= PAGINA 3 // SCELTA SPECIFICA ============= */}
            {step === 3 && (
                <>
                    {serviceType === 'colf' && (
                        <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                            <legend className="h5 mb-3">Cosa serve</legend>

                            {/* ---------- BASE O ESPERTA ---------- */}
                            <div className="form-check pb-2">
                                <input
                                    type="radio"
                                    id="basicYes"
                                    value="base"
                                    className="form-check-input"
                                    {...register('colfDetails.experienceLevel', { required: 'Scegli una delle opzioni' })}
                                />
                                <label htmlFor="basicYes" className="form-check-label">
                                    Solo pulizie di base, nessuna esperienza pregressa
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="basicNo"
                                    value="esperta"
                                    className="form-check-input"
                                    {...register('colfDetails.experienceLevel', { required: 'Scegli una delle opzioni' })}
                                />
                                <label htmlFor="basicNo" className="form-check-label">
                                    Colf con esperienza pregressa o competenze specifiche
                                </label>
                            </div>
                            {errors.colfDetails?.experienceLevel && (
                                <p className="text-danger small mb-0">{errors.colfDetails.experienceLevel.message}</p>
                            )}

                            {/* ---------- SOLO PER LA COLF ESPERTA ---------- */}
                            {experienceLevel === 'esperta' && (
                                <div className="mt-4">
                                    <p className="form-label mb-2">In casa ci sono altri addetti da coordinare?</p>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="otherStaffYes"
                                            value="si"
                                            className="form-check-input"
                                            {...register('colfDetails.otherStaff', { required: 'Scegli una risposta' })}
                                        />
                                        <label htmlFor="otherStaffYes" className="form-check-label">Sì</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="otherStaffNo"
                                            value="no"
                                            className="form-check-input"
                                            {...register('colfDetails.otherStaff', { required: 'Scegli una risposta' })}
                                        />
                                        <label htmlFor="otherStaffNo" className="form-check-label">No</label>
                                    </div>
                                    {errors.colfDetails?.otherStaff && (
                                        <p className="text-danger small mb-0">{errors.colfDetails.otherStaff.message}</p>
                                    )}

                                    {/* ---------- SOLO SE NON CI SONO ALTRI ADDETTI ---------- */}
                                    {otherStaff === 'no' && (
                                        <div className="mt-3">
                                            <p className="form-label mb-2">Sono richieste competenze specifiche?</p>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="skillsYes"
                                                    value="si"
                                                    className="form-check-input"
                                                    {...register('colfDetails.specificSkillsNeeded', { required: 'Scegli una risposta' })}
                                                />
                                                <label htmlFor="skillsYes" className="form-check-label">Sì</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="skillsNo"
                                                    value="no"
                                                    className="form-check-input"
                                                    {...register('colfDetails.specificSkillsNeeded', { required: 'Scegli una risposta' })}
                                                />
                                                <label htmlFor="skillsNo" className="form-check-label">No, si occuperà di tutta la casa</label>
                                            </div>
                                            {errors.colfDetails?.specificSkillsNeeded && (
                                                <p className="text-danger small mb-0">{errors.colfDetails.specificSkillsNeeded.message}</p>
                                            )}

                                            {/* ---------- SOLO SE SERVONO COMPETENZE ---------- */}
                                            {specificSkillsNeeded === 'si' && (
                                                <div className="mt-3">
                                                    <p className="form-label mb-2">Quali competenze?</p>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="checkbox"
                                                            id="skillCucina"
                                                            value="cucina"
                                                            className="form-check-input"
                                                            {...register('colfDetails.specificCompetenceNeeded')}
                                                        />
                                                        <label htmlFor="skillCucina" className="form-check-label">Cucina</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="checkbox"
                                                            id="skillStiro"
                                                            value="stiro"
                                                            className="form-check-input"
                                                            {...register('colfDetails.specificCompetenceNeeded')}
                                                        />
                                                        <label htmlFor="skillStiro" className="form-check-label">Stiro</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="checkbox"
                                                            id="skillGiardino"
                                                            value="giardino"
                                                            className="form-check-input"
                                                            {...register('colfDetails.specificCompetenceNeeded')}
                                                        />
                                                        <label htmlFor="skillGiardino" className="form-check-label">Giardino</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="checkbox"
                                                            id="skillAutista"
                                                            value="autista"
                                                            className="form-check-input"
                                                            {...register('colfDetails.specificCompetenceNeeded')}
                                                        />
                                                        <label htmlFor="skillAutista" className="form-check-label">Autista</label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </fieldset>
                    )}
                </>
            )}

            {/* ================= NAVIGAZIONE ============= */}
            <div className="d-flex justify-content-center align-items-center gap-4">
                {step > 1 && <Button
                    type='button'
                    aria-label="indietro"
                    onClick={goToPreviousStep}>
                    <ArrowLeft />
                </Button>}
                <p className="mb-0">Passo {step} di 4</p>
                {(step < 4) && <Button
                    type='button'
                    aria-label="avanti"
                    onClick={goToNextStep}>
                    <ArrowRight />
                </Button>}
            </div>
        </form>
    </Container>
    )
}


