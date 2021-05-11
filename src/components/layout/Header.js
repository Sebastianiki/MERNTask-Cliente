import React, {useContext} from 'react'
import AuthContext from '../../context/autenticacion/authContext'
import {Container, Navbar, Button} from 'react-bootstrap'
import './Header.css'
const Header = () => {

    const authContext = useContext(AuthContext)
    const {usuario, cerrarSesion} = authContext

    return (
        <Container className='appHeader m-0 mw-100 d-flex align-items-center'>
            {usuario ? <p className='w-25 m-0 pUsuario'>Hola <span className='spanUsuario'>{usuario.nombre}</span></p> : null}
            <Navbar className='p-0 d-flex justify-content-end w-75 align-items-center'>
                <Button className='btnCerrarSesion' onClick={() => cerrarSesion()}>CERRAR SESION</Button>
            </Navbar>
        </Container>
    );
}
 
export default Header