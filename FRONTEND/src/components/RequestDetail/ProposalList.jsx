import { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import { UserRoundX } from 'lucide-react'

export const ProposalList = ({ proposals, requestStatus, onConfirm, onReject }) => {
    const [selectedProposal, setSelectedProposal] = useState(null)

    return (
        <>
            <h2>Carer proposte:</h2>
            {proposals.length === 0
                ? <p className="small text-muted">Nessuna Carer proposta ancora</p>
                : proposals.map((proposal) => (
                    <Card key={proposal._id} className="mx-1 mb-3 bg-cl-surface border border-cl rounded-3">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title className="text-capitalize fw-bold mb-1">
                                    {proposal.worker.nome} {proposal.worker.lastName}
                                </Card.Title>
                                <Card.Subtitle className="text-muted">{proposal.worker.phone}</Card.Subtitle>
                            </div>
                            <div className="d-flex flex-column align-items-end gap-2">

                                {proposal.status === 'proposta' && <span className='badge rounded-pill badgeYellow text-dark'>In colloquio</span>}
                                {proposal.status === 'attivo' && <span className='badge rounded-pill badgeGreen text-dark'>Contratto</span>}
                                {proposal.status === 'cessato' && <span className='badge rounded-pill badgeRed text-dark'>Non Scelta</span>}
                                {proposal.status === 'proposta' && requestStatus !== 'Chiusa' && (
                                    <div className='d-flex gap-2'>
                                        <Button onClick={() => setSelectedProposal(proposal)}>
                                            Assumi Carer
                                        </Button>
                                        <Button onClick={() => { onReject(proposal._id) }} aria-label='scarta proposta' variant='outline-secondary'><UserRoundX size={16} /></Button>
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                ))}



            {/* MODALE DI CONFERMA */}
            <Modal show={selectedProposal !== null} onHide={() => { setSelectedProposal(null) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma il contratto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Confermi <span className='fw-bold fs-4 text-uppercase text-cl-primary'> {`${selectedProposal?.worker.nome} ${selectedProposal?.worker.lastName}`} </span>per il contratto?
                        <br />
                        La richiesta verrà chiusa e le altre Carer proposte torneranno disponibili.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setSelectedProposal(null)}>Annulla</Button>
                    <Button onClick={() => {
                        onConfirm(selectedProposal._id)
                        setSelectedProposal(null)
                    }}>Conferma</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}