import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import TableRow from './TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'App/GlobalStorage/StateStorage';


const TableField = (props) => {

    const { globalStateStorage } = useContext(AppContext);
    const { sort_field, sort_direction } = globalStateStorage.fetchDataParams.searchParams;

    const { token, tasks } = props;

    const tableRows = tasks.map((item) => (
        <TableRow key={item.id.toString()}
            token={token}
            id={item.id.toString()}
            username={item.username}
            email={item.email}
            text={item.text}
            status={item.status} />
    ));

    const usernameSortIcon = (sort_field === 'username' ?
        (sort_direction === 'desc' ? faSortDown : faSortUp) :
        faSort);

    const emailSortIcon = (sort_field === 'email' ?
        (sort_direction === 'desc' ? faSortDown : faSortUp) :
        faSort);

    const statusSortItem = (sort_field === 'status' ?
        (sort_direction === 'desc' ? faSortDown : faSortUp) :
        faSort);

    const changeSorting = (sortValues) => {
        globalStateStorage.setFetchDataParams({
            ...globalStateStorage.fetchDataParams,
            searchParams: {
                ...globalStateStorage.fetchDataParams.searchParams,
                ...sortValues
            }
        });
    };

    const handleSort = (e) => {
        const sortType = e.currentTarget.attributes.sorttype.value;
        
        if (sort_field === sortType) {
            if (sort_direction === 'asc') {
                changeSorting({ sort_direction: 'desc' });
            } else {
                changeSorting({ sort_field: 'id', sort_direction: 'asc' });
            }
        } else {
            changeSorting({ sort_field: sortType, sort_direction: 'asc' });
        }
    };

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                        Имя пользователя
                        <Button variant="light" className="sav2-opt-button ml-2" onClick={handleSort} title="Сортировка по Имени" sorttype="username">
                            <FontAwesomeIcon icon={usernameSortIcon} size="1x" />
                        </Button>
                    </th>
                    <th className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                        email
                        <Button variant="light" className="sav2-opt-button ml-2" onClick={handleSort} title="Сортировка по Email" sorttype="email">
                            <FontAwesomeIcon icon={emailSortIcon} size="1x" />
                        </Button>
                    </th>
                    <th className="align-middle pt-1" style={{ whiteSpace: 'nowrap' }}>текст задачи</th>
                    <th className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                        статус
                        <Button variant="light" className="sav2-opt-button ml-2" onClick={handleSort} title="Сортировка по Статусу" sorttype="status">
                            <FontAwesomeIcon icon={statusSortItem} size="1x" />
                        </Button>
                    </th>
                    { token &&
                        <th className="align-middle">Действия</th>
                    }
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    );
};

export default TableField;