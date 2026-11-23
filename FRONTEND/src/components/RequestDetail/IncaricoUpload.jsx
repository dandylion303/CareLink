import { useState } from "react"
import { Form, Button } from "react-bootstrap"
const URL = import.meta.env.VITE_API_URL


export const IncaricoUpload = ({ requestId, isUploaded }) => {
    const [file, setFile] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const handleUpload = async () => {
        if (!file) {
            setErrorMessage('Aggiungi file')
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        try {
            setIsLoading(true)
            setErrorMessage('')
            const token = localStorage.getItem('token')
            const response = await fetch(`${URL}/requests/${requestId}/incarico`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                setErrorMessage(data.message)
            } else {
                isUploaded(data)
            }

        } catch (error) {
            setErrorMessage('Server non raggiungibile')
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="bg-cl-surface border border-cl rounded-3 p-4 my-4">
            <h2 className="h5 mb-3">Incarico firmato</h2>
            <Form.Group controlId="incaricoFile" className="mb-3">
                <Form.Label>Carica il PDF firmato dalla famiglia</Form.Label>
                <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </Form.Group>
            <Button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Caricamento...' : 'Carica incarico firmato'}
            </Button>
            {errorMessage && <p className="text-danger small mb-0 mt-2">{errorMessage}</p>}
        </div>
    )

}