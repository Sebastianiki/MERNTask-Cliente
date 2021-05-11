import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import ProyectoState from './context/Proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import tokenAuth from './config/tokenAuth'
import RutaPrivada from './components/rutas/RutaPrivada'
function App() {

  const token = localStorage.getItem('token')
  if(token){
    tokenAuth(token)
  }
  
  return (
    <AuthState>
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </AuthState>
  );
}

export default App;
