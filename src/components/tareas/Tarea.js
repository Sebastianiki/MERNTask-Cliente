import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import TareaContext from '../../context/tareas/tareaContext'
import ProyectoContext from '../../context/Proyectos/proyectoContext'
import './Tarea.css'

const Tarea = ({tarea}) => {
    const tareasContext = useContext(TareaContext)
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto} = proyectosContext
    const [proyectoSeleccionado] = proyecto

    const eliminar = id =>{
        eliminarTarea(id, proyectoSeleccionado._id)
        obtenerTareas(proyectoSeleccionado._id)
    }

    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea)
    }
    return (
        <div className='containerTarea d-flex justify-content-center mt-3'>
            <div className='w-50 tareadiv d-flex align-items-center'>
                <p className='m-0 w-50'>{tarea.nombre}</p>
                <div className='d-flex align-items-center justify-content-end w-50'>
                    {tarea.estado
                        ? <span className='completo tareaEstado' onClick={() => cambiarEstado(tarea)}>FINALIZADA</span>
                        : <span className='incompleto tareaEstado' onClick={() => cambiarEstado(tarea)}>INCOMPLETA</span>
                    }
                    <Button variant="primary" className="btnTarea" onClick={() => seleccionarTarea(tarea)}>EDITAR</Button>
                    <Button variant="danger" className="btnTarea" onClick={() => eliminar(tarea._id)}>ELIMINAR</Button>
                </div>
            </div>
        </div>
    );
}
 
export default Tarea;