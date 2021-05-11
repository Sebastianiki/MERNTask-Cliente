import React, {useContext} from 'react'
import {Container, Row, Button} from 'react-bootstrap'
import Tarea from './Tarea'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import './ListadoTareas.css'

const ListadoTareas = () => {
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext
    const tareasContext = useContext(TareaContext)
    const {tareasproyecto} = tareasContext
    if(!proyecto){
        return (
            <Container className='containerListadoTareas mt-4'>
                <Row className='d-flex justify-content-center m-0 p-0'>
                <h2>Selecciona un proyecto</h2>
                </Row>
            </Container>
        );
    }
    
    const [proyectoSeleccionado] = proyecto
    return (
        <Container className='containerListadoTareas pt-5'>
            <Row className='d-flex justify-content-center m-0 p-0'>
            <h2>{proyectoSeleccionado.nombre}</h2>
            </Row>
            <div className='m-0 p-0'>
                    {tareasproyecto.length === 0
                        ? <h3 className='ml-5'>No hay tareas para mostrar</h3>
                        : <TransitionGroup>
                            {tareasproyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={200}
                                    classNames='tareaTransition'
                                >
                                    <Tarea tarea={tarea}></Tarea>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    }
            </div>
            <Button variant="light" className='ml-5' onClick={()=> eliminarProyecto(proyectoSeleccionado._id)}>Eliminar Proyecto &times;</Button>
        </Container>
    );
}
 
export default ListadoTareas;