import { NavLink, Outlet, Link } from "react-router-dom"
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Layout = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const [showMenu, setShowMenu] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }



    return (
        <>
            {/*/////////----HEADER----/////////////////*/}

            <div className="d-flex flex-column min-vh-100">
                <header className="mainHeader d-flex justify-content-between align-items-center px-4 py-3 my-0">
                    <span className="h1">
                        <Link to='/' className="logo">
                            Care<em className="text-cl-primary">Link</em>
                        </Link>
                    </span>

                    <div className="d-flex align-items-center gap-3">
                        {user?.role === 'admin'
                            ? <p className="small">Admin</p>
                            : <div className="small text-cl-primary text-end">
                                <p className="mb-0 fw-bold"> {user?.sedeName}</p>
                                <p className="mb-0">{user?.email}</p>
                            </div>}
                        {!token && (<Link to={'/login'} className="btn btn-primary">Login</Link>)}
                        {token && (<Button
                            onClick={handleLogout}
                            variant="outline-secondary">
                            Esci
                        </Button>)}

                    </div>
                </header>
                {/*/////////----CONTENUTO----///////////////*/}
                <Container fluid className="p-4 flex-grow-1">
                    <Row>
                        <Col md={3} lg={2} className="menu-col">
                            <Button
                                variant="outline-secondary"
                                className="d-md-none mb-3"
                                onClick={() => setShowMenu(true)}>
                                Menu
                            </Button>

                            <Offcanvas
                                show={showMenu}
                                onHide={() => setShowMenu(false)}
                                responsive="md">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Menu</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <nav className="nav flex-column w-100" onClick={() => setShowMenu(false)}>
                                        <NavLink to='/' className='nav-link'>Home</NavLink>
                                        <NavLink to='/carers' className='nav-link'>Carer</NavLink>
                                        <NavLink to='/family' className='nav-link'>Famiglie</NavLink>
                                        <NavLink to='/request' className='nav-link'>Richieste</NavLink>
                                        <NavLink to='/simulatore' className='nav-link'>Simulatore</NavLink>
                                        <hr className="my-2" />
                                        <NavLink to='/bacheca' className='nav-link'>Bacheca Pubblica</NavLink>
                                    </nav>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Col>
                        <Col>
                            <main>
                                <Outlet />
                            </main>
                        </Col>
                    </Row>
                </Container>
                <footer className="border-top border-cl small text-cl-secondary p-2 text-center">
                    <p>Made with care by DandyLion</p>
                </footer>
            </div>

        </>
    );
}