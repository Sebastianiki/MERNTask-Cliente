import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA} from '../../types'


const tareaReducer = (state,action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto : action.payload,
                errortarea: false
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errortarea: action.payload
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto : state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaSeleccionada: null
            }
        default:
            return state
    }
}

export default tareaReducer