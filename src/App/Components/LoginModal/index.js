import React, { useContext, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from 'App/GlobalStorage/StateStorage';

function LoginModal(props) {

    const { globalStateStorage } = useContext(AppContext);

    const { show } = props;

    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    const [displayErrLogin, setDisplayErrLogin] = useState(false);
    const [displayErrPassword, setDisplayErrPassword] = useState(false);

    const clearErrors = () => {
        setDisplayErrLogin((prevVal) => (false));
        setDisplayErrPassword((prevVal) => (false));
    };

    const handleClose = () => {
        clearErrors();
        globalStateStorage.showLoginModal(false);
    };

    const handleSignIn = () => {
        let validData = true;

        if (loginInput.current.value.trim().length === 0) {
            setDisplayErrLogin((prevVal) => (true));
            validData = false;
        }

        if (passwordInput.current.value.trim().length === 0) {
            setDisplayErrPassword((prevVal) => (true));
            validData = false;
        }

        if (!validData) {
            return;
        }

        const authData = {
            username: loginInput.current.value.trim(),
            password: passwordInput.current.value
        };

        clearErrors();
        globalStateStorage.showLoginModal(false);

        globalStateStorage.setFetchDataParams({
            ...globalStateStorage.fetchDataParams,
            action: 'login',
            data: authData,
            sendMethod: 'POST'
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control type="text" name="login" ref={loginInput}></Form.Control>
                    <small style={{ display: displayErrLogin ? 'inline' : 'none' }} className="text-danger">Поле обязательно к заполнению</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="password" name="password" ref={passwordInput}></Form.Control>
                    <small style={{ display: displayErrPassword ? 'inline' : 'none' }} className="text-danger">Поле обязательно к заполнению</small>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button block variant="primary" onClick={handleSignIn}>Войти</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;