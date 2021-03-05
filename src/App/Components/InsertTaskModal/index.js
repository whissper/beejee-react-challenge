import React, { useContext, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from 'App/GlobalStorage/StateStorage';
import { observer } from 'mobx-react-lite';

const InsertTaskModal = observer((props) => {

    const { globalStateStorage } = useContext(AppContext);

    const show = globalStateStorage.insertTaskModal.show;

    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const textInput = useRef(null);

    const [displayErrUsername, setDisplayErrUsername] = useState(false);
    const [displayErrEmail, setDisplayErrEmail] = useState(false);
    const [displayErrTasktext, setDisplayErrTasktext] = useState(false);

    const clearErrors = () => {
        setDisplayErrUsername((prevVal) => (false));
        setDisplayErrEmail((prevVal) => (false));
        setDisplayErrTasktext((prevVal) => (false));
    };

    const handleClose = () => {
        clearErrors();
        globalStateStorage.showInsertTaskModal(false);
    };

    const handleAdd = () => {
        let validData = true;
        //eslint-disable-next-line
        const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        if (usernameInput.current.value.trim().length === 0) {
            setDisplayErrUsername((prevVal) => (true));
            validData = false;
        }

        if (!emailExp.test(emailInput.current.value.trim())) {
            setDisplayErrEmail((prevVal) => (true));
            validData = false;
        }

        if (textInput.current.value.trim().length === 0) {
            setDisplayErrTasktext((prevVal) => (true));
            validData = false;
        }

        if (!validData) {
            return;
        }

        const newTask = {
            username: usernameInput.current.value.trim(),
            email: emailInput.current.value.trim(),
            text: textInput.current.value.trim()
        };

        clearErrors();
        globalStateStorage.showInsertTaskModal(false);

        globalStateStorage.setPostData({
            action: 'create',
            data: newTask,
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ввод нового задания</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные по заданию:</p>
                <Form.Group>
                    <Form.Label>Имя пользователя:</Form.Label>
                    <Form.Control type="text" name="username" ref={usernameInput}></Form.Control>
                    <small style={{ display: displayErrUsername ? 'inline' : 'none' }} className="text-danger">Введите имя пользователя</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" ref={emailInput}></Form.Control>
                    <small style={{ display: displayErrEmail ? 'inline' : 'none' }} className="text-danger">Введите корректный Email</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Текст задачи:</Form.Label>
                    <Form.Control as="textarea" rows={5} name="text" ref={textInput}></Form.Control>
                    <small style={{ display: displayErrTasktext ? 'inline' : 'none' }} className="text-danger">Введите текст задачи</small>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAdd}>Добавить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default InsertTaskModal;