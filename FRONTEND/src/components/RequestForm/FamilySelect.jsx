import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const URL = import.meta.env.VITE_API_URL

export const FamilySelect = ({ register, errors }) => {
    const [families, setFamilies] = useState([])

    useEffect(() => {
        const getFamilies = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`${URL}/family`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                })
                const data = await response.json()
                if (!response.ok) {
                    console.log(data.message)
                } else {
                    setFamilies(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        getFamilies()

    }, [])


    return (
        <>
            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Famiglia Richiedente</legend>
                <Row>
                    <Col md={12}>
                        <label className='form-label'>Famiglia</label>
                        <select
                            className='form-select'
                            {...register(
                                'famiglia',
                                { required: 'Non può rimanere vuoto' })}>
                            <option value="">Seleziona</option>
                            {families.map((family) => (
                                <option
                                    key={family._id}
                                    value={family._id} >
                                    {family.customerLastname} {family.customerName} ({family.codiceFiscale})
                                </option>
                            ))}
                        </select>
                        {errors.famiglia && <p className='text-danger small mb-0'>{errors.famiglia.message}</p>}
                    </Col>
                </Row>
            </fieldset>

        </>
    )

}