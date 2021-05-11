import React, {useContext, useEffect} from 'react'
import {Container, ListGroup, Alert} from 'react-bootstrap'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import './ListadoProyecto.css'

const ListadoProyectos = () => {

    const proyectosContext = useContext(ProyectoContext)
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos()
        // eslint-disable-next-line
    },[mensaje])

    if(proyectos.length === 0) return <p className='noProyectos'>No cuentas con proyectos</p>
    return (
        <Container>
            <ListGroup variant="flush">
                {alerta
                    ?   <Alert variant={alerta.categoria} className='alertaEliminarError'>
                            <Alert.Heading>{alerta.msg}</Alert.Heading>
                        </Alert>
                    : null
                }
                <TransitionGroup>
                    {proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames='proyectoTransition'
                        >
                            <Proyecto proyecto={proyecto}></Proyecto>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
}
 
export default ListadoProyectos;