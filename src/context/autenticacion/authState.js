import React, {useReducer} from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import {
    REGISTRO_EXITOSO,
    REGISTRO_FALLIDO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_FALLIDO,
    CERRAR_SESION
} from '../../types'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registrarUsuario = async usuario =>{
        try{
            const respuesta = await clienteAxios.post('/api/usuarios', usuario)
            console.log(respuesta.data)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado()
        }catch(error){
            //console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'danger'
            }
            dispatch({
                type: REGISTRO_FALLIDO,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token')
        if(token){
            tokenAuth(token)
        }
        try{
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
            
        }catch(error){
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'danger'
            }
            dispatch({
                type: LOGIN_FALLIDO,
                payload: alerta
            })
        }
    }

    const iniciarSesion = async usuario =>{
        try{
            const respuesta = await clienteAxios.post('/api/auth', usuario)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado()
        }catch(error){
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'danger'
            }
            dispatch({
                type: LOGIN_FALLIDO,
                payload: alerta
            })
        }
    }

    const cerrarSesion = async =>{
        dispatch({
            type: CERRAR_SESION
        })
    } 
    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState