import { NavLink, Outlet, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Layout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }
        
    

    return (
        <>
{/*/////////----HEADER----/////////////////*/}

            <header className="mainHeader d-flex justify-content-between align-items-center px-4 py-3">
                <span className="h1">
                    <Link to='/' className="logo">
                        Care<em className="text-cl-primary">Link</em>
                    </Link>
                </span>
                {!token && (<Link to={'/login'} className="btn btn-primary">Login</Link>)}
                {token && (<Button
                    onClick={handleLogout}>
                    Esci
                </Button>)}
            </header>
{/*/////////----CONTENUTO----///////////////*/}     
            <Container fluid>
                <Row>
                    <Col md={3} lg={2}>
                        <nav className="nav flex-column">
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/carers' className='nav-link'>Carers</NavLink>
                            <NavLink to='/family' className='nav-link'>Famiglie</NavLink>
                            <NavLink to='/request' className='nav-link'>Richieste</NavLink>
                            <NavLink to='/simulatore' className='nav-link'>Simulatore</NavLink>

                        </nav>
                    </Col>
                    <Col>
                        <main>
                            <Outlet />
                        </main>
                    </Col>
                </Row>
            </Container>

        </>
    );
}