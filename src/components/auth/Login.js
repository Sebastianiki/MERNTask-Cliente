import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Form, Button, Image, Alert} from 'react-bootstrap'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'
import logo from '../../images/jimbei.png'
import './Login.css'

const Login = (props) => {

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext
    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, iniciarSesion} = authContext

    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history])

    const [usuario, guardarUsuario] = useState({
        email : '',
        password : ''
    })
    const {email, password } = usuario

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'danger')
            return
        }
        iniciarSesion({email,password})
    }
    return (
        <Container className='h-100 d-flex justify-content-center align-items-center'>
            {alerta
                ?   <Alert variant={alerta.categoria} className='alertaNuevaCuenta'>
                        <Alert.Heading>{alerta.msg}</Alert.Heading>
                    </Alert>
                : null
            }

            <div className='contenedorForm'>
                <Form onSubmit={onSubmit}>  
                    <Row className='d-flex justify-content-center mb-4'>
                        <Image 
                        className='loginLogo' 
                        src={logo} 
                        roundedCircle 
                        fluid/>
                    </Row>

                    <Form.Group controlId="loginEmail">
                        <Form.Control 
                            size='lg' 
                            type="email" 
                            placeholder="Correo electronico" 
                            onChange={onChange}
                            name='email'
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Control 
                            size='lg'
                            type="password" 
                            placeholder="Contraseña"
                            onChange={onChange}
                            name='password'
                            value={password}
                        />
                    </Form.Group>

                    <Button variant='none' className='btnLogin' type="submit" size='lg' block>
                        Iniciar Sesion
                    </Button>
                    <Row className='d-flex justify-content-center mt-3 mb-1'>
                        <a href='!#' className='recuperarPassword'>¿Olvidaste tu Contraseña?</a>
                    </Row>
                    <hr></hr>
                    <Link to={'/nueva-cuenta'} className='link'>
                        <Button variant='none' className='btnNuevaCuenta' type="button" size='lg' block>
                            Crear una cuenta
                        </Button>
                    </Link>
                </Form>
            </div>
            
        </Container>
    );
}
 
export default Login;