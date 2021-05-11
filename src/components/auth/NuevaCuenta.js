import React, {useState,useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Form, Button, Alert} from 'react-bootstrap'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'
import './NuevaCuenta.css'

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext
    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, registrarUsuario} = authContext

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
        password : '',
        confirmpassword : '',
        nombre : ''
    })
    const {email, password, confirmpassword, nombre} = usuario

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        if(email.trim() === '' || password.trim() === '' || confirmpassword.trim() === '' || nombre.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'danger')
            return
        }
        if(password.length < 6){
            mostrarAlerta('La password debe de tener al menos 6 caracteres', 'danger')
            return
        }
        if(password.trim() !== confirmpassword.trim()){
            mostrarAlerta('Las passwords no coinciden', 'danger')
            return
        }
        registrarUsuario({nombre, email, password})
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
                    <h2 className='text-center mb-5'>Crear nueva cuenta</h2>
                    <Form.Group controlId="loginName">
                        <Form.Control 
                            size='lg' 
                            type="text" 
                            placeholder="Nombre" 
                            onChange={onChange}
                            name='nombre'
                            value={nombre}
                        />
                    </Form.Group>
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

                    <Form.Group controlId="loginRepeatPassword">
                        <Form.Control 
                            size='lg'
                            type="password" 
                            placeholder="Repetir Contraseña"
                            onChange={onChange}
                            name='confirmpassword'
                            value={confirmpassword}
                        />
                    </Form.Group>

                    <Button variant='none' className='btnCrearCuenta' type="submit" size='lg' block>
                        Crear cuenta
                    </Button>
                    <hr></hr>
                    <Link to={'/'} className='link'>
                        <Button variant='none' className='btnVolver' type="button" size='lg' block>
                            Volver
                        </Button>
                    </Link>
                </Form>
            </div>
            
        </Container>
    );
}
 
export default NuevaCuenta;