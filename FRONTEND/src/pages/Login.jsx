import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL


export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        setErrorMessage('')
        try {
            const response = await fetch (`${URL}/auth/login`, {
                method: 'POST',
                headers:{'Content-type': 'application/json'},
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(!response.ok){
                setErrorMessage(result.message)
            } else {
                localStorage.setItem('token', result.token)
                
                navigate('/')

            }
        } catch (error) {
            console.log(error) 
            setErrorMessage('Server non raggiungibile')
        }
    }


    return (

        <Container>
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={12} sm={8} md={5} lg={4}>
                    <Card className="rounded-2 bg-white border-white p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="form-label d-block">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    aria-invalid={errors.email ? "true" : "false"}
                                    {...register("email", { required: "L'email è richiesta" })}
                                />
                                {errors.email && <p role="alert" className="text-danger">{errors.email.message}</p>}
                            </div>
                            <div className="mt-3">
                                <label className="form-label d-block">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    aria-invalid={errors.password ? "true" : "false"}
                                    {...register("password", { required: "Devi inserire la password" })}
                                />
                                {errors.password && <p role="alert" className="text-danger">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="mt-3 w-100">Submit</Button>
                            {errorMessage.length>0 &&<p role='alert' className='text-danger'>{errorMessage}</p>}
                        </form>
                    </Card>

                </Col>
            </Row>
        </Container>

    )

}