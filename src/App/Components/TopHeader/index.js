import React from 'react';
import './TopHeader.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'

const TopHeader = () => {

    return (
        <Container fluid className="sav2-top-header">
            <Row>
                <Col className="justify-content-center align-self-center">BeeJee-React-Challenge</Col>
                <Col xs="auto" className="justify-content-center align-self-center"> v 0.1.0</Col>
                <Col xs="auto" className="justify-content-center align-self-center">
                    <FontAwesomeIcon icon={faReact} size="3x" />
                </Col>
            </Row>
        </Container>
    );

}

export default TopHeader;