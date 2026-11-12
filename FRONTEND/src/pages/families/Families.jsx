import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


const URL = import.meta.env.VITE_API_URL

export const Families = () => {
    const [families, setFamilies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        const getFamilies = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    setErrorMessage("Non hai l'autorizzazione per fare questo")
                    return
                }
                const response = await fetch(`${URL}/family`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                })
                const result = await response.json()
                if (!response.ok) {
                    setErrorMessage(result.message)
                } else {
                    setFamilies(result)
                }
            } catch (error) {
                setErrorMessage("Server non raggiungibile")
                console.log(error)

            } finally {
                setIsLoading(false)
            }
        }
        getFamilies()
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

    if (families.length === 0) {
        return (<p className="text-cl-secondary">La lista è vuota</p>)
    }


    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h1 className=" h3 text-start text-cl-primary">Abbiamo {families.length} famiglie da aiutare:</h1>
                {user?.role === 'sede' && (<Link to='/family/new' className="btn btn-primary">+ Famiglia</Link>)}
            </div>
            <div className="bg-cl-surface border border-cl rounded-3 overflow-hidden">
                <Table hover responsive className='align-middle mb-0'>
                    <thead>
                        <tr>
                            <th>Nome e Cognome</th>
                            <th>Città</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Origine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {families.map((family) => (
                            <tr key={family._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <p className="round-initials me-3 mb-0 border rounded-circle bg-cl-positive">
                                            {family.customerName[0]}{family.customerLastname[0]}
                                        </p>
                                        <div>
                                            <p className="fw-bold mb-0 text-capitalize">{family.customerName} {family.customerLastname}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{family.customerAddress.city}</td>
                                <td>{family.phone}</td>
                                <td>{family.email}</td>
                                <td><span className="badge rounded-pill bg-cl-positive ">{family.source}</span></td>

                            </tr>
                        ))}

                    </tbody>
                </Table >
            </div>
        </>
    )
}

