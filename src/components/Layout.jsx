import {Fragment} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from './../assets/logo.png';
import './styles.css';

const Layout = (props) => {
    const loggedLinks = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/search">Restauracje</Nav.Link>
            <Nav.Link as={Link} to="/user">Panel użytkownika</Nav.Link>
            <Nav.Link as={Link} to="/recommend">Rekomendacje</Nav.Link>
            <Nav.Link as={Link} to="/logout">Wyloguj</Nav.Link>
        </Nav>
    )

    const notLoggedLinks = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
        </Nav>
    )

    return(
        <Fragment>
              <Navbar bg="dark" variant="dark">
                    <Navbar.Brand><img className="Logo" src={logo} alt="X"/>YumBook</Navbar.Brand>
                    {props.isLogged ? loggedLinks : notLoggedLinks}
            </Navbar>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;