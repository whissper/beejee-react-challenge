import React, { useContext } from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'App/GlobalStorage/StateStorage';


const Menu = (props) => {

    const { globalStateStorage } = useContext(AppContext);

    const handleLogin = () => {
        globalStateStorage.showLoginModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');

        globalStateStorage.setInfoBox({
            variant: 'info',
            text: '',
            show: false
        });
    };

    const { token } = props;

    const statusValue = (token ? 'Авторизованный : Администратор' : 'Не авторизован');

    return (
        <Row>
            <Col lg={12}>
                <Row>
                    <Col lg={12}>
                        <InputGroup className="sav2-mb-1">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} size="1x" />
                                    &nbsp;&nbsp;Статус пользователя:&nbsp;:
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={statusValue} />
                        </InputGroup>
                    </Col>
                    <Col lg={12}>
                        { token ?
                            <Button style={{minWidth: '150px'}} variant="primary" onClick={handleLogout}>Выход</Button> :
                            <Button style={{minWidth: '150px'}} variant="primary" onClick={handleLogin}>Авторизоваться</Button>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Menu;