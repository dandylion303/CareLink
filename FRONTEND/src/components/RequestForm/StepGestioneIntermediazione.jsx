import { Alert, Col, Row, } from "react-bootstrap";

export const StepGestioneIntermediazione = ({ register, errors, watch }) => {
    const isPublic = watch('isPublic')
    return (
        <>
            {/* -----------COSTO DELL'INTERMEDIAZIONE PER LA FAMIGLIA----------- */}
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Costo</legend>
                <Row>
                    <Col>
                        <label className="form-label">Costo richiesto alla famiglia</label>
                        <input
                            type="number"
                            min='0'
                            className="form-control"
                            placeholder="€ 200"
                            {...register('serviceFee', { required: 'Necessario indicare un importo' })}
                        />
                        {errors.serviceFee && <p className="text-danger small mb-0">{errors.serviceFee.message}</p>}
                    </Col>
                </Row>
            </fieldset>
            {/* ----------------RENDI PUBBLICA LA RICHIESTA---------------- */}
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <Row className="g-3">
                    <Col md={6} className="d-flex align-items-end">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="isPublic"
                                className="form-check-input"
                                {...register('isPublic')}
                            />
                            <label htmlFor="isPublic" className="form-check-label">
                                Pubblica questa richiesta nella bacheca
                            </label>
                        </div>
                        {errors.isPublic && <p className='text-danger small mb-0'>{errors.isPublic.message}</p>}


                    </Col>
                    {isPublic && (
                        <>
                        <Col md={12}>
                            <textarea
                                className='form-control mt-2'
                                rows="10"
                                placeholder="Scrivi una descrizione pubblica per questa richiesta..."
                                {...register('publicDescription', { required: 'La descrizione è necessaria per spiegare alle lavoratrici interessate cosa stiamo cercando' })}
                            />
                            {errors.publicDescription && <p className='text-danger small mb-0'>{errors.publicDescription.message}</p>}

                            <Alert variant="warning mt-2">Ricorda che la descrizione è pubblica; Non scrivere nomi, numeri di telefono o indirizzi</Alert>
                        </Col>
                        </>
                    )}
                </Row>
            </fieldset>
        </>
    )
}