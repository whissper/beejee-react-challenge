import React, { useContext, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from 'App/GlobalStorage/StateStorage';
import { observer } from 'mobx-react-lite';

const UpdateTaskModal = observer((props) => {

    const { globalStateStorage } = useContext(AppContext);

    const { show, id, username, email, text, status } = globalStateStorage.updateTaskModal;

    const textInput = useRef(null);
    const statusCheck = useRef(null);

    const [displayErrTasktext, setDisplayErrTasktext] = useState(false);

    const clearErrors = () => {
        setDisplayErrTasktext((prevVal) => (false));
    };

    const handleClose = () => {
        clearErrors();
        globalStateStorage.showUpdateTaskModal(
            { show: false }
        );
    };

    const handleSave = () => {
        if (textInput.current.value.trim().length === 0) {
            setDisplayErrTasktext((prevVal) => (true));
            return;
        }

        let statusData = {
            ready: (status === 10 || status === 11),
            edited: (status === 1 || status === 11)
        };

        if (textInput.current.value.trim() !== textInput.current.defaultValue.trim()) {
            statusData.edited = true;
        }

        statusData.ready = statusCheck.current.checked;

        const statusValue = statusData.ready ? 
            (statusData.edited ? 11 : 10) : 
            (statusData.edited ? 1 : 0);

        const editedTask = {
            text: textInput.current.value.trim(),
            status: statusValue,
            token: localStorage.getItem('userToken')
        };

        clearErrors();
        globalStateStorage.showUpdateTaskModal(
            { show: false }
        );

        globalStateStorage.setPostData({
            action: `edit/${id}`,
            data: editedTask
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование задания</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные по заданию: {status}</p>
                <Form.Group>
                    <Form.Label>Имя пользователя:</Form.Label>
                    <Form.Control type="text" name="username" disabled value={username}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" disabled value={email}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Текст задачи:</Form.Label>
                    <Form.Control as="textarea" rows={5} name="text" ref={textInput} defaultValue={text}></Form.Control>
                    <small style={{ display: displayErrTasktext ? 'inline' : 'none' }} className="text-danger">Введите текст задачи</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Статус задачи:</Form.Label>
                    <Form.Check label="Задание выполнено" type="checkbox"
                        ref={statusCheck} defaultChecked={status === 10 || status === 11} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>Cохранить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateTaskModal;