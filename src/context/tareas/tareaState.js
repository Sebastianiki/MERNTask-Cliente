import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaSeleccionada: null
    }

    const [state,dispatch] = useReducer(TareaReducer,initialState)

    const obtenerTareas = async proyecto =>{
        try{
            const resultado = await clienteAxios.get('/api/tareas', { params : {proyecto}})
            dispatch({
                type: TAREAS_PROYECTO,
                payload : resultado.data.tareas
            })
        }catch(error){
            console.log(error)
        }
    }

    const agregarTareas = async tarea => {
        try{
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        }catch(error){
            console.log(error)
        }
    }
    
    const validarTarea = mostrarError =>{
        dispatch({
            type: VALIDAR_TAREA,
            payload: mostrarError
        })
    }

    const eliminarTarea = async (tareaId, proyecto) =>{
        try{
            await clienteAxios.delete(`/api/tareas/${tareaId}`, {params : {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload : tareaId
            })
        }catch(error){
            console.log(error)
        }
    }

    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea =>{
        try{
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tareaExiste
            })
        }catch(error){
            console.log(error )
        }
    }

    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTareas,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState