import { useForm } from "react-hook-form";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
            const response = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (!response.ok) {
                setErrorMessage(result.message)
            } else {
                localStorage.setItem('token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                navigate('/')

            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Server non raggiungibile')
        }
    }


    return (
        <>
            <header className="mainHeader d-flex justify-content-between align-items-center px-4 py-3 mb-0">
                <span className="h1 mb-0">
                    <Link to="/bacheca" className="logo">
                        Care<em className="text-cl-primary">Link</em>
                    </Link>
                </span>
                <Link to="/bacheca">Offerte di lavoro</Link>
            </header>

            <section style={{ background: 'var(--cl-primary)', color: '#FFFFFF' }}>
                <Container className="py-5">
                    <p className="small fw-light text-uppercase mb-2" style={{ color: '#B9E2D8' }}>
                        Area riservata alle sedi
                    </p>
                    <h1 className="mb-0">Accedi</h1>
                </Container>
            </section>

            <Container className="py-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
                        <Button type="submit" className="mt-3 w-100">Entra</Button>
                        {errorMessage.length > 0 && <p role='alert' className='text-danger'>{errorMessage}</p>}
                        <p className="small text-cl-secondary border-top border-cl pt-3 mt-4 mb-0">
                            Non ricordi la password? <br/>Scrivi all'amministratore della rete: te ne imposterà una nuova
                        </p>
                    </form>
            </Container>
        </>
    )

}