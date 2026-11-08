import { Row, Col } from "react-bootstrap";
const hoursLimits = {
    convivente: { min: 25, max: 54, label: 'convivente' },
    notturno: { min: 25, max: 54, label: 'notturno' },
    conviventePartTime: { min: 25, max: 30, label: 'convivente Part-Time' },
    nonConvivente: { min: 1, max: 40, label: 'Non Convivente' },
}

export const StepDettaglio = ({ register, errors, watch }) => {
    const durationType = watch('durationType')

    return (
        <>
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
    )
}
