import { Col, Row } from 'react-bootstrap'

export const StepRichiesteSpecifiche = ({ register, errors, watch }) => {
    const hasPets = watch('hasPets')
    return (
        <>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Richieste specifiche</legend>
                <Row className="g-3">

                    {/* ---------- ANIMALI ---------- */}
                    <Col md={12}>
                        <p className="form-label mb-2">Ci sono animali domestici in casa?</p>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                id="hasPetsYes"
                                value="si"
                                className="form-check-input"
                                {...register('hasPets', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="hasPetsYes" className="form-check-label">Sì</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                id="hasPetsNo"
                                value="no"
                                className="form-check-input"
                                {...register('hasPets', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="hasPetsNo" className="form-check-label">No</label>
                        </div>
                        {errors.hasPets && <p className="text-danger small mb-0">{errors.hasPets.message}</p>}
                    </Col>


                    {hasPets === 'si' && (
                        <>
                            <Col md={3}>
                                <label className="form-label">Numero di cani</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    {...register('pets.cani')}
                                />
                            </Col>
                            <Col md={3}>
                                <label className="form-label">Numero di gatti</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    {...register('pets.gatti')}
                                />
                            </Col>
                            <Col md={6}>
                                <label className="form-label">Altri animali</label>
                                <input
                                    type="text"
                                    placeholder="Uccelli, conigli, pesci..."
                                    className="form-control"
                                    {...register('pets.altro')}
                                />
                            </Col>
                        </>
                    )}

                </Row>
            </fieldset>

            {/* ---------- LINGUA E PATENTE ---------- */}
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <Row className="g-3">
                    <Col md={6}>
                        <label className="form-label">Lingua richiesta oltre all'italiano</label>
                        <input
                            type="text"
                            placeholder="Inglese, francese..."
                            className="form-control"
                            {...register('requiredLanguage')}
                        />
                    </Col>
                </Row>
            </fieldset>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">

                <Row className="g-3">
                    <Col md={6} className="d-flex align-items-end">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="requiredDrivingLicense"
                                className="form-check-input"
                                {...register('requiredDrivingLicense')}
                            />
                            <label htmlFor="requiredDrivingLicense" className="form-check-label">
                                È richiesta la patente
                            </label>
                        </div>
                    </Col>
                </Row>
            </fieldset>
            {/* ---------- NOTE ---------- */}
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">

                <Row className="g-3">
                    <Col md={12}>
                        <label className="form-label">Note</label>
                        <textarea
                            rows="4"
                            className="form-control"
                            placeholder='altro da sapere'
                            {...register('notes')}
                        />
                    </Col>
                </Row>
            </fieldset>
        </>
    )
}