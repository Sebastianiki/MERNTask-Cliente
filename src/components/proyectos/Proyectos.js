import React, {useContext, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import FormTareas from '../tareas/FormTareas'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autenticacion/authContext'
const Proyectos = () => {

    const authContext = useContext(AuthContext)
    const {usuarioAutenticado} = authContext

    useEffect(()=>{
        usuarioAutenticado()
        // eslint-disable-next-line
    },[])
    
    return (
        <Container fluid className='p-0 h-100'>
            <Row className='h-100 m-0'>
                <Col xl={2} lg={3} md={3} xs={4} className='p-0'>
                    <Sidebar/>
                </Col>
                <Col xl={10} lg={9} md={9} xs={8} className='p-0'>
                    <Header></Header>
                    <FormTareas></FormTareas>
                    <ListadoTareas></ListadoTareas>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Proyectos;