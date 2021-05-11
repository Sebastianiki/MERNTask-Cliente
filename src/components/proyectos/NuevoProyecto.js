import React, {useState, useContext, useRef} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Overlay from 'react-bootstrap/Overlay'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import './NuevoProyecto.css'

const NuevoProyecto = () => {

    const proyectosContext = useContext(ProyectoContext)
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext
    const target = useRef(null);
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })
    const {nombre} = proyecto

    const onChange = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(nombre.trim() === ''){
            mostrarError()
            return
        }

        agregarProyecto(proyecto)
        guardarProyecto({nombre : ''})
        const boton = document.querySelector('#btnCrearProyecto')
        boton.innerHTML = 'Crear Proyecto'
        boton.classList.add('btnNuevoProyecto')
        boton.classList.remove('btnCancelarNuevoProyecto')
    }
    const crearProyecto = e =>{
        if(e.target.innerHTML === 'Crear Proyecto'){
            e.target.innerHTML = 'Cancelar'
            e.target.classList.add('btnCancelarNuevoProyecto')
            e.target.classList.remove('btnNuevoProyecto')
            mostrarFormulario(true)
        }else{
            e.target.innerHTML = 'Crear Proyecto'
            e.target.classList.add('btnNuevoProyecto')
            e.target.classList.remove('btnCancelarNuevoProyecto')
            mostrarFormulario(false)
        }
    }
    return (
        <>
            <Container>
                <Button variant='none' id='btnCrearProyecto' className='btnNuevoProyecto mb-5 mt-5' type="submit" block onClick={crearProyecto}>
                    Crear Proyecto
                </Button>
                { formulario ? 
                    <Form
                        onSubmit={onSubmit}
                    >  
                        <Form.Group controlId="nameProyecto">
                            <Form.Control
                                type="text" 
                                placeholder="Nombre de tu proyecto"
                                name='nombre'
                                value={nombre}
                                onChange={onChange}
                                ref={target}
                            />
                        </Form.Group>

                        <Button variant='none' className='btnNuevoProyecto mb-5' type="submit" block>
                            Agregar Proyecto
                        </Button>
                        {errorformulario
                            ?   <Overlay target={target.current} show={true} placement="right">
                                    {(props) => (
                                        <div
                                            {...props}
                                            style={{
                                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                            marginLeft: '5px',
                                            padding: '2px 10px',
                                            color: 'white',
                                            borderRadius: 3,
                                            ...props.style,
                                            }}
                                        >
                                            El nombre del proyecto no puede estar vacio
                                        </div>
                                    )}
                                </Overlay>
                            :   null
                        }
                    </Form> : null
                }
            </Container>
        </>
    );
}
 
export default NuevoProyecto;