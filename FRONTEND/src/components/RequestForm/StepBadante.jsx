import { Row, Col } from 'react-bootstrap'


export const StepBadante = ({ register, errors, watch }) => {
    const hasSpecialNeeds = watch('badanteDetails.hasSpecialNeeds')
    const hasSpecialDiet = watch('badanteDetails.hasSpecialDiet')
    const selfSufficientLevel = watch('badanteDetails.selfSufficientLevel')
    const cognitiveState = watch('badanteDetails.cognitiveState')

    const isFullySelfSufficient = selfSufficientLevel === 'completamenteAutosufficiente'
    const isPartlySelfSufficient = selfSufficientLevel === 'abbastanzaAutosufficiente'
    const isNotSelfSufficientButLucid = selfSufficientLevel === 'nonAutosufficiente' && cognitiveState === 'lucido'
    return (
        <>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Persona da assistere</legend>
                <Row className="g-4">
                    <Col>
                        <label className="form-label">Assistito</label>
                        <input
                            type='text'
                            placeholder='Nome e Cognome'
                            className='form-control'
                            {...register('badanteDetails.mainAssistedName', { required: 'Campo obbligatorio' })}
                        />
                        {errors.badanteDetails?.mainAssistedName && <p className='text-danger small mb-0'>{errors.badanteDetails?.mainAssistedName.message}</p>}
                    </Col>
                    <Col sm={6}>
                        <label className="form-label">Età assistito</label>
                        <input
                            type='date'
                            className='form-control'
                            {...register('badanteDetails.birthDate', { required: 'Campo obbligatorio' })}
                        />
                        {errors.badanteDetails?.birthDate && <p className='text-danger small mb-0'>{errors.badanteDetails?.birthDate.message}</p>}

                    </Col>
                    <Col sm={12}>
                        <label className="form-label">Numero di assistiti non autosufficienti</label>
                        <input
                            type='number'
                            min='1'
                            className='form-control'
                            {...register('badanteDetails.numberOfAssisted', { required: 'Campo obbligatorio', valueAsNumber: true })}
                        />
                        {errors.badanteDetails?.numberOfAssisted && <p className='text-danger small mb-0'>{errors.badanteDetails?.numberOfAssisted.message}</p>}
                    </Col>
                </Row>
            </fieldset>
            {/* -------// Valutazione Autosufficienza Assistito //------ */}

            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Tipologia di assistenza</legend>
                <Row className="g-4">
                    <Col sm={12}>
                        <label className="form-label">L'assistito è</label>
                        <select
                            className="form-select"
                            {...register('badanteDetails.selfSufficientLevel', { required: 'Campo obbligatorio' })}>
                            <option value="">Seleziona</option>
                            <option value="completamenteAutosufficiente">Completamente Autosufficiente</option>
                            <option value="abbastanzaAutosufficiente">Abbastanza Autosufficiente</option>
                            <option value="nonAutosufficiente">Non Autosufficiente</option>
                            <option value="disabileGrave">Disabile Grave</option>
                        </select>
                        {errors.badanteDetails?.selfSufficientLevel && <p className='text-danger small mb-0'>{errors.badanteDetails?.selfSufficientLevel.message}</p>}
                    </Col>
                    <Col sm={12}>
                        <label className="form-label">Stato Cognitivo:</label>
                        <select
                            className="form-select"
                            {...register('badanteDetails.cognitiveState', { required: 'Campo obbligatorio' })}>
                            <option value="">Seleziona</option>
                            <option value="lucido">Lucido</option>
                            <option value="primiDeficit">Primi Deficit Cognitivi</option>
                            {!isFullySelfSufficient && !isPartlySelfSufficient && (
                                <>
                                    <option value="demenzaAlzheimerGrave">Demenza o Alzheimer avanzati</option>
                                    <option value="disabileGrave">Disabilità Grave</option>
                                </>
                            )}
                            {!isFullySelfSufficient && (
                                <option value="altro">Altro</option>
                            )}
                        </select>
                        {errors.badanteDetails?.cognitiveState && <p className='text-danger small mb-0'>{errors.badanteDetails?.cognitiveState.message}</p>}
                    </Col>
                    <Col sm={12}>
                        <label className="form-label">Mobilità:</label>
                        <select
                            className="form-select"
                            {...register('badanteDetails.mobility', { required: 'Campo obbligatorio' })}>
                            <option value="">Seleziona</option>
                            {!isNotSelfSufficientButLucid && (
                                <option value="autonomo">Completamente Autonomo</option>
                            )}
                            <option value="bastoneSupporto">Necessita bastone o supporto occasionali</option>
                            {!isFullySelfSufficient && (
                                <option value="deambulatore">Solo con deambulatore</option>
                            )}
                            {!isFullySelfSufficient && !isPartlySelfSufficient && (
                                <>
                                    <option value="carrozzina">In carrozzina</option>
                                    <option value="allettato">Allettato</option>
                                </>
                            )}
                        </select>
                        {errors.badanteDetails?.mobility && <p className='text-danger small mb-0'>{errors.badanteDetails?.mobility.message}</p>}
                    </Col>
                </Row>
            </fieldset>
            {/* -------// Bisogni Specifici //------ */}

            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Bisogni Specifici</legend>
                <Row className="g-4">
                    <Col sm={12}>
                        <label className="form-label pe-2">L'assistito necessita di terapie o macchinari specifici?</label>

                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialNeedsNo"
                                value="no"
                                className="form-check-input"
                                {...register('badanteDetails.hasSpecialNeeds', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialNeedsNo" className="form-check-label">No, non ha esigenze particolari</label>
                        </div>
                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialNeedsYes"
                                value="si"
                                className="form-check-input"
                                {...register('badanteDetails.hasSpecialNeeds', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialNeedsYes" className="form-check-label">Sì</label>
                        </div>
                        {errors.badanteDetails?.hasSpecialNeeds && <p className='text-danger small mb-0'>{errors.badanteDetails?.hasSpecialNeeds.message}</p>}
                        {hasSpecialNeeds === 'si' &&
                            <textarea
                                className='form-control mt-2'
                                rows="10"
                                placeholder="Stomia, Sondino, PEG, Medicazioni, Ossigeno..."
                                {...register('badanteDetails.therapiesDetail')}
                            />}
                    </Col>
                </Row>

                {/* -------// Dieta Speciale //------ */}

                <Row className="g-4">
                    <Col sm={12}>
                        <label className="form-label pe-2">L'assistito deve seguire una dieta speciale?</label>

                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialDietNo"
                                value="no"
                                className="form-check-input"
                                {...register('badanteDetails.hasSpecialDiet', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialDietNo" className="form-check-label">No, non deve seguire nessuna dieta speciale</label>
                        </div>
                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialDietYes"
                                value="si"
                                className="form-check-input"
                                {...register('badanteDetails.hasSpecialDiet', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialDietYes" className="form-check-label">Sì</label>
                        </div>
                        {errors.badanteDetails?.hasSpecialDiet && <p className='text-danger small mb-0'>{errors.badanteDetails?.hasSpecialDiet.message}</p>}
                        {hasSpecialDiet === 'si' &&
                            <textarea
                                className='form-control mt-2'
                                rows="10"
                                placeholder="Senza glutine, Iposodica, Liquida..."
                                {...register('badanteDetails.specialDiet')}
                            />}
                    </Col>
                </Row>

            </fieldset>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">La Notte</legend>
                <Row>
                    <Col sm={12}>
                        <label className="form-label">Dorme durante la notte?:</label>
                        <select
                            className="form-select"
                            {...register('badanteDetails.sleepsAtNight')}>
                            <option value="">Seleziona</option>
                            <option value="si">si</option>
                            <option value="no">no</option>
                            <option value="saltuariamente">saltuariamente</option>
                        </select>
                        {errors.badanteDetails?.sleepsAtNight && <p className='text-danger small mb-0'>{errors.badanteDetails?.sleepsAtNight.message}</p>}
                    </Col>
                </Row>
            </fieldset>
        </>
    )
}