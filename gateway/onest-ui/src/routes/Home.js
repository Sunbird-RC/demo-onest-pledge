

import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import CauseList from './CauseList';

function Home(props) {
    let [currentCause, setCurrentCause]= useState("All Categories");
    let [causes, setCauses] = useState(props.causes);


    const setNewCauseType = (causType) => {
        setCurrentCause(causType);
    }

  return (
    <Container fluid>
        <Row xs={12} style={{
            height: '30vh',
            background: 'linear-gradient(180deg, #FFF 0%, #EDF0FD 86.52%)'
        }}>
            <Col xs={8}>
                <Row style={{margin:'30px', color: '#0F75BC'}}><h4>Lines On Scholarship with Infographic</h4></Row>
                <Row style={{margin:'30px'}}><p>Empowering Minds,Building Future:Pledge for Educational Impact!</p></Row>
            </Col>
            <Col xs={4}>
            </Col>
        </Row>
        <Row style={{height: 'auto'}}>
            <Col xs={0} md={1} lg={1}></Col>
            <Col xs ={0} md={3} lg={3}><Sidebar causes={causes} causeChangeHandler={setNewCauseType}/></Col>
            <Col xs ={12} md={8} lg={8}><CauseList causes={causes} causeType={currentCause}/></Col>
        </Row>
    </Container>

  );
}

export default Home;