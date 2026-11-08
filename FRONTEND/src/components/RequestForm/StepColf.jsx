
export const StepColf = ({ register, errors, watch }) => {

    const experienceLevel = watch('colfDetails.experienceLevel')
    const otherStaff = watch('colfDetails.otherStaff')
    const specificSkillsNeeded = watch('colfDetails.specificSkillsNeeded')
    return (
        <>
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

        </>
    )

}