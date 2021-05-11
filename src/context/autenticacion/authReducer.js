import {
    REGISTRO_EXITOSO,
    REGISTRO_FALLIDO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_FALLIDO,
    CERRAR_SESION
} from '../../types'

const authReducer = (state, action) =>{
    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_FALLIDO:
        case REGISTRO_FALLIDO:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                mensaje: action.payload,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        default:
            return state
    }
}

export default authReducer