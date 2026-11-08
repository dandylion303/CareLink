import { Row, Col } from "react-bootstrap";




export const StepBase = ({ register, errors, watch }) => {
    const serviceType = watch('serviceType')

    return (
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
    )
}