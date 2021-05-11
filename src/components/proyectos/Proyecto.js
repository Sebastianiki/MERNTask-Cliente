import React, {useContext} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'


const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(ProyectoContext)
    const {proyectoActual} = proyectosContext
    const tareasContext = useContext(TareaContext)
    const {obtenerTareas} = tareasContext
    const seleccionarProyecto = id =>{
        proyectoActual(id)
        obtenerTareas(id)
    }
    return (
        <ListGroup.Item onClick={()=> seleccionarProyecto(proyecto._id)}>{proyecto.nombre}</ListGroup.Item>
    );
}
 
export default Proyecto;