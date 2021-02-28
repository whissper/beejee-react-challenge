import React, {useContext} from 'react';
import { InputGroup, FormControl, Button, Row, Col, } from 'react-bootstrap';
import { AppContext } from 'App/GlobalStorage/StateStorage';


const TableInfo = (props) => {

    const { globalStateStorage } = useContext(AppContext);

    const { countRows } = props;

    const handleClick = () => {
        globalStateStorage.showInsertTaskModal(true);
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <p>Лист заданий:</p>
                </Col>
                <Col md="auto" className="mb-2 mb-lg-0">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Всего записей:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl disabled value={countRows} style={{ maxWidth: '200px' }} />
                    </InputGroup>
                </Col>
                <Col md="auto">
                    <Button variant="primary" onClick={handleClick}>Создать задачу</Button>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default TableInfo;