import { Row, Col } from 'react-bootstrap'
export const StepBabysitter = ({ register, errors, watch }) => {
    const hasSpecialNeeds = watch('babySitterDetails.hasSpecialNeeds')
    return (
        <>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Dettaglio Babysitter</legend>
                <Row className="g-4">
                    <Col sm={12} md={6}>
                        <label className="form-label">Quanti bambini ci sono in casa?</label>
                        <input
                            type='number'
                            min="1"
                            className="form-control"
                            {...register('babySitterDetails.numberOfChildren', {
                                valueAsNumber: true,
                                required: 'Campo obbligatorio',
                            })} />
                        {errors.babySitterDetails?.numberOfChildren && <p className='text-danger small mb-0'>{errors.babySitterDetails?.numberOfChildren.message}</p>}
                    </Col>
                    <Col sm={12} md={6}>
                        <label className="form-label">Data di nascita del più piccolo</label>
                        <input
                            type='date'
                            min="2009-01-01"
                            className='form-control'
                            {...register('babySitterDetails.dateOfBirthYoungest', { required: 'Campo obbligatorio' })}
                        />
                        {errors.babySitterDetails?.dateOfBirthYoungest && <p className='text-danger small mb-0'>{errors.babySitterDetails?.dateOfBirthYoungest.message}</p>}
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col>
                        <label className="form-label pe-2">Il bambino ha esigenze particolari?</label>
                        
                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialNeedsNo"
                                value="no"
                                className="form-check-input"
                                {...register('babySitterDetails.hasSpecialNeeds', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialNeedsNo" className="form-check-label">No, non ha esigenze particolari</label>
                        </div>
                        <div className="form-check ms-5">
                            <input
                                type="radio"
                                id="specialNeedsYes"
                                value="si"
                                className="form-check-input"
                                {...register('babySitterDetails.hasSpecialNeeds', { required: 'Scegli una risposta' })}
                            />
                            <label htmlFor="specialNeedsYes" className="form-check-label">Sì</label>
                        </div>
                        {errors.babySitterDetails?.hasSpecialNeeds && <p className='text-danger small mb-0'>{errors.babySitterDetails?.hasSpecialNeeds.message}</p>}
                        {hasSpecialNeeds === 'si' && <textarea
                            className='form-control mt-2'
                            rows="10" 
                            placeholder="Disturbo dell'attenzione, ADHD, Autismo, Dislessia..."
                            {...register('babySitterDetails.specialNeeds')}
                        />}
                    </Col>
                </Row>

            </fieldset>
        </>
    )
}