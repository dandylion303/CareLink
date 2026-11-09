import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Info } from 'lucide-react'

const URL = import.meta.env.VITE_API_URL

export const Requests = () => {
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const getRequests = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setErrorMessage("Non hai l'autorizzazione per fare questo")
                return
            }
            const response = await fetch(`${URL}/requests`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                setRequests(result)
            }
        } catch (error) {
            setErrorMessage("Server non raggiungibile")
            console.log(error)

        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getRequests()
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

    if (requests.length === 0) {
        return (<p className="text-cl-secondary">La lista è vuota</p>)
    }

    const activateRequest = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/requests/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ statusRichiesta: 'Attiva' })
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else { getRequests() }
        } catch (error) {
            setErrorMessage('Server non raggiungibile')
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h1 className=" h3 text-start text-cl-primary">Abbiamo {requests.length} ricerche in corso:</h1>
                {user?.role === 'sede' && (<Link to='/request/new' className="btn btn-primary">+ Intermediazione</Link>)}
            </div>
            <div className="bg-cl-surface border border-cl rounded-3 overflow-hidden">
                <Table hover responsive className='align-middle mb-0'>
                    <thead>
                        <tr>
                            <th>Famiglia</th>
                            <th>Servizio</th>
                            <th>Regime</th>
                            <th>Livello</th>
                            <th>Città</th>
                            <th>status</th>
                            <th>info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <p className="round-initials me-3 mb-0 border rounded-circle bg-cl-positive">
                                            {request.famiglia.customerName[0]}{request.famiglia.customerLastname[0]}
                                        </p>
                                        <div>
                                            <p className="fw-bold mb-0 text-capitalize">{request.famiglia.customerName} {request.famiglia.customerLastname}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{request.serviceType}</td>
                                <td>{request.workRequest}</td>
                                <td>{request.livello}</td>
                                <td>{request.workAddress.city}</td>
                                <td><StatusBadge status={request.statusRichiesta} /></td>
                                <td><Link to={`/request/${request._id}`} className="btn btn-sm btn-primary-light">
                                    <Info size={16} />
                                </Link></td>
                            </tr>
                        ))}

                    </tbody>
                </Table >
            </div>
        </>
    )
}

