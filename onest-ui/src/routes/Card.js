import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


function CauseCard(props) {

    console.log(props);
    let navigate = useNavigate();

    const navigateToCauseDetails = (value) => {
      navigate('/causeDetails',  {state: value});
    };

    const navigateToPledge = (value) => {
      navigate('/pledge',  {state: value});
    };
  return (
    <Card style={{ width: '22rem', margin:"4px", padding: "4px" }}>
      <Card.Img variant="top" src={`${props.cause.imageRef[0]}`} />
      <Card.Body>
        <Card.Title>{props.cause.name}</Card.Title>
        <Card.Text>
        {props.cause.description}
        </Card.Text>
          {props.cause.organisation ?  <Card.Text> {`Facilitated by ${props.cause.organisation}`}</Card.Text> : null} 

        <Card.Text>
            {props.cause.amountPledged}
        </Card.Text>
        <Card.Text>
            {props.cause.amountNeeded}
        </Card.Text>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => navigateToCauseDetails(props.cause)}>Details</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => navigateToPledge(props.cause)}>Pledge</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CauseCard;