import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className='barraLateral h-100 m-0'>
            <h2 className='tituloBarraLateral pt-5'><span>MERN</span>task</h2>
            <NuevoProyecto></NuevoProyecto>
            <h3 className='tituloProyectos mb-4'>Tus Proyectos</h3>
            <ListadoProyectos> </ListadoProyectos>
        </div>
    );
}
 
export default Sidebar;