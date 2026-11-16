import { Col, Alert, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { PaginationBar } from '../PaginationBar'





export const MatchResults = ({ matches, actionError, requestStatus, onPropose }) => {

    const itemsPerPage = 6
    const [page, setPage] = useState(1)
    const numberOfPages = Math.ceil(matches.length / itemsPerPage)
    const visibleItems = matches.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return (
        <>
            <div>
                <h2>Carer da proporre:</h2>
                {actionError !== '' && <Alert variant='warning'>{actionError}</Alert>}
                {matches.length === 0
                    ? <p className="small text-muted text-capitalize">Non ci sono Carers per questa richiesta</p>
                    : visibleItems.map((match) => (
                        <Card key={match.worker._id} className="mx-1 mb-4 bg-cl-surface border border-cl rounded-3">
                            <Card.Body>
                                <Col className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <p className="round-initials me-3 mb-0 border rounded-circle bg-cl-positive">
                                                {match.worker.nome[0]}{match.worker.lastName[0]}
                                            </p>
                                        </div>
                                        <div>
                                            <Card.Title className="text-capitalize fw-bold fs-4">{match.worker.nome} {match.worker.lastName}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted text-uppercase">{match.worker.city} {match.worker.phone}</Card.Subtitle>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="h1 text-cl-match">{match.percentage}%</p>
                                    </div>
                                </Col>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Text className='d-flex flex-wrap align-items-center'>
                                        {match.reasons.map((reason) => (
                                            <span key={reason} className="badge rounded-pill bg-cl-positive m-1">{reason}</span>
                                        ))}
                                    </Card.Text>

                                    <div className='d-flex align-items-center'>
                                        {(requestStatus === 'Attiva' || requestStatus === 'inProva') &&
                                            <Button onClick={() => onPropose(match.worker._id)} className="m-2">Proponi</Button>}

                                        <a href={`https://wa.me/${match.worker.phone.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">Whatsapp</a>
                                    </div>
                                </div>
                            </Card.Body>

                        </Card>
                    ))}
                <PaginationBar
                    currentPage={page}
                    totalPages={numberOfPages}
                    onPageChange={setPage} />
            </div>
        </>
    )
}