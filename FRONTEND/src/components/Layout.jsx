import { NavLink, Outlet, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";

export const Layout = () => {
    return (
        <>
//HEADER        
            <header className="d-flex justify-content-between align-items-center px-4 py-3">
                <span className="h1">
                    <Link to='/'>
                        Care<em className="text-cl-primary">Link</em>
                    </Link>
                </span>
                <Button>Esci</Button>
            </header>
//CONTENUTO 
            <Container fluid>
                <Row>
                    <Col md={3} lg={2}>
                        <nav className="nav flex-column">
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/carers' className='nav-link'>Carers</NavLink>
                            <NavLink to='/famiglie' className='nav-link'>Famiglie</NavLink>
                            <NavLink to='/requests' className='nav-link'>Richieste</NavLink>
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