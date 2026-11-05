import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


const URL = import.meta.env.VITE_API_URL

export const Carers = () => {
    const [carers, setCarers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const getCarers = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    setErrorMessage("Non hai l'autorizzazione per fare questo")
                    return
                }
                const response = await fetch(`${URL}/carers`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                })
                const result = await response.json()
                if (!response.ok) {
                    setErrorMessage(result.message)
                } else {
                    setCarers(result)
                }
            } catch (error) {
                setErrorMessage("Server non raggiungibile")

            } finally {
                setIsLoading(false)
            }
        }
        getCarers()
    }, [])

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>)
    }

    if (errorMessage) {
        return (
            <div className="bg-cl-negative p-3 rounded-3">
                <p className="mb-0">{errorMessage}</p>
            </div>
        )
    }

    if (carers.length === 0) {
        return (<p className="text-cl-secondary">La lista è vuota</p>)
    }


    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h1 className=" h3 text-start text-cl-primary">Abbiamo {carers.length} Carer da proporre:</h1>
                <Link to='/carers/new' className="btn btn-primary">+ Carer</Link>
            </div>
            <div className="bg-cl-surface border border-cl rounded-3 overflow-hidden">
                <Table hover responsive className='align-middle mb-0'>
                    <thead>
                        <tr>
                            <th>Nome e Cognome</th>
                            <th>Lavoro</th>
                            <th>Regime</th>
                            <th>Telefono</th>
                            <th>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carers.map((carer) => (
                            <tr key={carer._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <p className="round-initials me-3 mb-0 border rounded-circle bg-cl-positive">
                                            {carer.nome[0]}{carer.lastName[0]}
                                        </p>
                                        <div>
                                            <p className="fw-bold mb-0 text-capitalize">{carer.nome} {carer.lastName}</p>
                                            <p className="fw-lighter text-cl-secondary small mb-0">{carer.city}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{(carer.jobTypes).join(', ')}</td>
                                <td>{(carer.regimes).join(', ')}</td>
                                <td>{carer.phone}</td>
                                <td>{carer.status === 'disponibile'
                                    ? <span className="badge rounded-pill badge-positive px-3 py-2">
                                        Disponibile
                                    </span>
                                    : <span className="badge rounded-pill badge-negative px-3 py-2">
                                        Non Disponibile
                                    </span>}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table >
            </div>
        </>
    )
}

