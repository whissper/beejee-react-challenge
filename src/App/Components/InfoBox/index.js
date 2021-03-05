import React, { useContext } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'App/GlobalStorage/StateStorage';
import { observer } from 'mobx-react-lite';

const InfoBox = observer((props) => {

    const { globalStateStorage } = useContext(AppContext);

    const { variant, text, show } = globalStateStorage.infoBox;

    const closeInfoBox = () => {
        globalStateStorage.setInfoBox({ show: false });
    };

    let iconType = faTimesCircle;

    switch (variant) {
        case 'danger':
            iconType = faTimesCircle;
            break;
        case 'info':
            iconType = faInfoCircle;
            break;
        case 'success':
            iconType = faCheckCircle;
            break;
        default:
            iconType = faInfoCircle;
            break;
    }

    return (
        <Row>
            <Col lg={12}>
                <Alert variant={variant} dismissible onClose={closeInfoBox} show={show} >
                    <FontAwesomeIcon icon={iconType} size="lg" />
                    &nbsp;{text}
                </Alert>
            </Col>
        </Row>
    );
});

export default InfoBox;