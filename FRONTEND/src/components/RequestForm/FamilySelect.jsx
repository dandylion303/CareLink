import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

const URL = import.meta.env.VITE_API_URL



export const FamilySelect = ({ control, errors }) => {
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

    const options = families.map((family) => ({
        value: family._id,
        label: `${family.customerLastname} ${family.customerName} ${family.codiceFiscale}`
    }))


    return (
        <>

            <fieldset className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
                <legend className="h5 mb-3">Famiglia Richiedente</legend>
                <Row>
                    <Col md={12}>
                        <label className='form-label'>Famiglia</label>

                        <Controller
                            name='famiglia'
                            control={control}
                            rules={{ required: 'Scegli la famiglia' }}
                            render={({ field }) => (

                                <Select
                                    inputId='familySelect'
                                    options={options}
                                    placeholder='Cerca per nome, cognome o codice fiscale'
                                    noOptionsMessage={() => 'Nessuna famiglia trovata'}
                                    isClearable
                                    value={options.find((option) => option.value === field.value) || null}
                                    onChange={(option) => field.onChange(option ? option.value : ' ')}
                                />
                            )}
                        />
                        {errors.famiglia && <p className='text-danger small mb-0'>{errors.famiglia.message}</p>}
                    </Col>
                </Row >
            </fieldset >

        </>
    )

}