import React, { useContext } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'App/GlobalStorage/StateStorage';


const TableRow = (props) => {

    const { globalStateStorage } = useContext(AppContext);

    const {
        token,
        id,
        username,
        email,
        text,
        status
    } = props;

    const handleClickUpdate = () => {
        globalStateStorage.showUpdateTaskModal(
            { show: true, id, username, email, text, status }
        );
    };

    let statusInfo = <React.Fragment>
        <Badge className="m-1" variant="danger">не выполнена</Badge>
    </React.Fragment>;

    if (status === 1) {
        statusInfo = <React.Fragment>
            <Badge className="m-1" variant="danger">не выполнена</Badge>
            <br />
            <Badge className="m-1" variant="info">отредактирована админом</Badge>
        </React.Fragment>;
    } else if (status === 10) {
        statusInfo = <React.Fragment>
            <Badge className="m-1" variant="success">выполнена</Badge>
        </React.Fragment>;
    } else if (status === 11) {
        statusInfo = <React.Fragment>
            <Badge className="m-1" variant="success">выполнена</Badge>
            <br />
            <Badge className="m-1" variant="info">отредактирована админом</Badge>
        </React.Fragment>;
    }

    return (
        <tr>
            <td style={{ whiteSpace: 'nowrap' }}>{username}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{email}</td>
            <td style={{ wordBreak: 'break-all' }}>{text}</td>
            <td>{statusInfo}</td>
            { token &&
                <td>
                    <Button variant="success" className="sav2-opt-button" onClick={handleClickUpdate} title="Изменить">
                        <FontAwesomeIcon icon={faPen} size="1x" />
                    </Button>
                </td>
            }
        </tr>
    );
};

export default TableRow;