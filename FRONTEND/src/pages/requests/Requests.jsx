import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { StatusBadge } from "../../components/StatusBadge";
import { Info } from 'lucide-react'
import { PaginationBar } from "../../components/PaginationBar";

const URL = import.meta.env.VITE_API_URL

export const Requests = () => {
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState('')

    const filteredRequests = requests.filter((request) => {
        const fullFamilyName = `${request.famiglia?.customerName || ''} ${request.famiglia?.customerLastname || ''}`.toLowerCase()
        const matchesName = fullFamilyName.includes(searchName.toLowerCase())

        const matchesStatus = searchStatus === '' || request.statusRichiesta === searchStatus

        return matchesName && matchesStatus;
    });


    const itemsPerPage = 5
    const [page, setPage] = useState(1)
    const numberOfPages = Math.ceil(filteredRequests.length / itemsPerPage)
    const visibleItems = filteredRequests.slice((page - 1) * itemsPerPage, page * itemsPerPage)



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


    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div className="d-flex align-items-baseline gap-3">
                    <h1 className="mb-0">Richieste</h1>
                    <span className="text-cl-secondary">{requests.length} in archivio</span>
                </div>
                {user?.role === 'sede' && (
                    <Link to='/request/new' className="btn btn-primary">+ Nuova Ricerca</Link>
                )}
            </div>




            <div className="d-flex gap-2 mb-3">
                <input
                    aria-label="cerca per nome"
                    className="form-control"
                    placeholder="Cerca famiglia"
                    type="text"
                    value={searchName}
                    onChange={(event) => { setSearchName(event.target.value); setPage(1) }} />

                <select
                    aria-label="Filtro"
                    className="form-select"
                    value={searchStatus}
                    onChange={(event) => { setSearchStatus(event.target.value); setPage(1) }}>
                    <option value="">Filtro Status</option>
                    <option value="Attiva">Attiva</option>
                    <option value="Chiusa">Chiusa</option>
                    <option value="inProva">In Prova</option>
                    <option value="inAttesa">In Attesa</option>
                </select>
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
                        {visibleItems.map((request) => (
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
                                    <Info size={16} /></Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table >
            </div>
            <PaginationBar
                currentPage={page}
                totalPages={numberOfPages}
                onPageChange={setPage} />
        </>
    )
}

