import { useState } from "react"
import { useEffect } from "react"
import { Spinner, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PaginationBar } from "../../components/PaginationBar";


const URL = import.meta.env.VITE_API_URL

export const Families = () => {
    const [families, setFamilies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    /* ========== FILTRO DI RICERCA ========= */
    const [searchName, setSearchName] = useState('')
    const [searchMail, setSearchMail] = useState('')
    const [searchOrigin, setSearchOrigin] = useState('')

    const filteredRequests = families.filter((family) => {
        const fullFamilyName = `${family.customerName || ''} ${family?.customerLastname || ''}`.toLowerCase()
        const matchesName = fullFamilyName.includes(searchName.toLowerCase())
        const matchesMail = searchMail === '' | family.email.includes(searchMail.toLowerCase())
        const matchesOrigin = searchOrigin === '' || family.source === searchOrigin

        return matchesName && matchesMail && matchesOrigin;
    });

    /* =========== PAGINATION =============== */
    const itemsPerPage = 5
    const [page, setPage] = useState(1)
    const numberOfPages = Math.ceil(filteredRequests.length / itemsPerPage)
    const visibleItems = filteredRequests.slice((page - 1) * itemsPerPage, page * itemsPerPage)


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
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div className="d-flex align-items-baseline gap-3">
                    <h1 className="mb-0">Famiglie</h1>
                    <span className="text-cl-secondary">{families.length} in archivio</span>
                </div>
                {user?.role === 'sede' && (
                    <Link to='/family/new' className="btn btn-primary">+ Nuova Famiglia</Link>
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
                <input
                    aria-label="cerca per nome"
                    className="form-control"
                    placeholder="Cerca email"
                    type="text"
                    value={searchMail}
                    onChange={(event) => { setSearchMail(event.target.value); setPage(1) }} />

                <select
                    aria-label="Filtro"
                    className="form-select"
                    value={searchOrigin}
                    onChange={(event) => { setSearchOrigin(event.target.value); setPage(1) }}>
                    <option value="">Cerca Origine</option>
                    <option value="social">Social</option>
                    <option value="google">Google</option>
                    <option value="cartelloni">Cartelloni</option>
                    <option value="volantino">Volantino</option>
                    <option value="passaparola">Passaparola</option>
                    <option value="altro">Altro</option>
                </select>
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
                        {visibleItems.map((family) => (
                            <tr key={family._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <p className="round-initials flex-shrink-0 me-3 mb-0 border rounded-circle bg-cl-positive">
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

            <PaginationBar
                currentPage={page}
                totalPages={numberOfPages}
                onPageChange={setPage} />
        </>
    )
}

