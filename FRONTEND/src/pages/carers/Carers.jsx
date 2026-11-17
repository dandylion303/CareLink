import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PaginationBar } from "../../components/PaginationBar";

const URL = import.meta.env.VITE_API_URL

export const Carers = () => {
    const [carers, setCarers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    /* ========== FILTRO DI RICERCA ========= */
    const [searchName, setSearchName] = useState('')
    const [searchType, setSearchType] = useState('')
    const [searchRegime, setSearchRegime] = useState('')
    const [searchStatus, setSearchStatus] = useState('')

    const filteredRequests = carers.filter((carer) => {
        const fullCarerName = `${carer.nome || ''} ${carer?.lastName || ''}`.toLowerCase()
        const matchesName = fullCarerName.includes(searchName.toLowerCase())
        const matchesJobType = searchType === '' || carer.jobTypes.includes(searchType)
        const matchesRegime = searchRegime === '' || carer.regimes.includes(searchRegime)
        const matchesStatus = searchStatus === '' || carer.status === searchStatus

        return matchesName && matchesRegime && matchesStatus && matchesJobType;
    });



    const itemsPerPage = 5
    const [page, setPage] = useState(1)
    const numberOfPages = Math.ceil(filteredRequests.length / itemsPerPage)
    const visibleItems = filteredRequests.slice((page - 1) * itemsPerPage, page * itemsPerPage)


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
                {user?.role === 'sede' && (<Link to='/carers/new' className="btn btn-primary">+ Carer</Link>)}
            </div>
            <div className="d-flex gap-2 mb-3">
                <input
                    aria-label="cerca per nome"
                    className="form-control"
                    placeholder="Cerca Carer"
                    type="text"
                    value={searchName}
                    onChange={(event) => { setSearchName(event.target.value); setPage(1) }} />

                <select
                    aria-label="Filtro"
                    className="form-select"
                    value={searchType}
                    onChange={(event) => { setSearchType(event.target.value); setPage(1) }}>
                    <option value="">Tipo Lavoro</option>
                    <option value="badante">Badante</option>
                    <option value="colf">Colf</option>
                    <option value="babysitter">BabySitter</option>
                </select>
                <select
                    aria-label="Filtro"
                    className="form-select"
                    value={searchRegime}
                    onChange={(event) => { setSearchRegime(event.target.value); setPage(1) }}>
                    <option value="">Tipo Regime</option>
                    <option value="convivente">Convivente</option>
                    <option value="nonConvivente">Non Convivente</option>
                    <option value="conviventePartTime">Convivente Part Time</option>
                    <option value="notturno">Notturno</option>
                </select>
                <select
                    aria-label="Filtro"
                    className="form-select"
                    value={searchStatus}
                    onChange={(event) => { setSearchStatus(event.target.value); setPage(1) }}>
                    <option value="">Status</option>
                    <option value="disponibile">Disponibile</option>
                    <option value="non disponibile">Non disponibile</option>
                </select>
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
                        {visibleItems.map((carer) => (
                            <tr key={carer._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <p className="round-initials flex-shrink-0 me-3 mb-0 border rounded-circle bg-cl-positive">
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
            <PaginationBar
                currentPage={page}
                totalPages={numberOfPages}
                onPageChange={setPage} />
        </>
    )
}

