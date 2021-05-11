import React, {useContext, useState, useRef, useEffect} from 'react'
import {Form, Button, Container, Overlay} from 'react-bootstrap'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'
import './FormTareas.css'

const FormTareas = () => {
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto} = proyectosContext
    const tareasContext = useContext(TareaContext)
    const {tareaSeleccionada, errortarea, agregarTareas, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext
    const [tarea, guardarTarea] = useState({
        nombre : ''
    })
    const {nombre} = tarea
    const target = useRef(null);

    useEffect(()=>{
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        } else{ 
            guardarTarea({
                nombre: ''
            })
        }
    },[tareaSeleccionada])

    if(!proyecto) return null
    const [proyectoSeleccionado] = proyecto
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        if(nombre.trim() === '') {
            validarTarea(true)
            return
        }
        validarTarea(false)
        if(tareaSeleccionada === null) {
            tarea.proyecto = proyectoSeleccionado._id
            console.log(tarea)
            agregarTareas(tarea)
        } else {
            actualizarTarea(tarea)
            limpiarTarea()
        }
        
        obtenerTareas(proyectoSeleccionado._id)
        guardarTarea({nombre: ''})
    }
    return (
        <Container className='containerFormTareas d-flex justify-content-center align-items-center'>
            <Form 
                className='w-50'
                onSubmit={onSubmit}
                >
                <Form.Group>
                    <Form.Control
                        type="text" 
                        placeholder="Ingresa un nombre a tu tarea"
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                        ref={target}
                        /> 
                </Form.Group>
                {errortarea
                    ?   <Overlay target={target.current} show={true} placement="top">
                            {(props) => (
                                <div
                                    {...props}
                                    style={{
                                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                        marginBottom: '5px',
                                        padding: '2px 10px',
                                        color: 'white',
                                        borderRadius: 3,
                                        ...props.style,
                                    }}
                                >
                                    El nombre de la tarea es obligatorio
                                </div>
                            )}
                        </Overlay>
                    :   null
                }
                <Button variant="none" type="submit" className='btnAgregarTarea' block>
                    {tareaSeleccionada ? 'EDITAR TAREA' : 'AGREGAR TAREA'}
                </Button>
            </Form>
        </Container>
    );
}
 
export default FormTareas;