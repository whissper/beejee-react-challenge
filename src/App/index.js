import React, { useEffect } from 'react';
import './App.css';
import { AppContext, getStateStorage } from 'App/GlobalStorage/StateStorage';
import { observer } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';
import processException from 'App/Utils/processException';
import TopHeader from 'App/Components/TopHeader';
import MainMenu from 'App/Components/MainMenu';
import InfoBox from 'App/Components/InfoBox';
import TableInfo from 'App/Components/TableInfo';
import TableField from 'App/Components/TableField';
import Paginator from 'App/Components/Paginator';
import InsertTaskModal from 'App/Components/InsertTaskModal';
import UpdateTaskModal from 'App/Components/UpdateTaskModal';
import LoginModal from 'App/Components/LoginModal';
import LightCover from 'App/Components/LightCover';
import fetchData from 'App/Utils/fetchData';

const globalStateStorage = getStateStorage();

const App = observer(() => {

    const handleItemClick = (pageNumber) => {
        globalStateStorage.setFetchDataParams({
            ...globalStateStorage.fetchDataParams,
            searchParams: {
                ...globalStateStorage.fetchDataParams.searchParams,
                page: pageNumber
            }
        });
    };

    const processQuery = async () => {
        let jsonResponse = null;

        globalStateStorage.setPendingRequest(true);

        const textResponse = await fetchData(globalStateStorage.fetchDataParams);

        const response = {
            message: textResponse,
            methodName: 'App.getTasks()',
            representError: (errorInfo) => {
                globalStateStorage.setInfoBox({
                    variant: 'danger',
                    text: errorInfo,
                    show: true
                });
            }
        };

        if (!processException(response)) {
            jsonResponse = JSON.parse(textResponse);
        }

        globalStateStorage.setPendingRequest(false);

        return jsonResponse;
    };

    const selectTasks = async () => {
        const response = await processQuery();
        globalStateStorage.setTaskList(response.message);
    };

    const insertTask = async () => {
        const response = await processQuery();

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'success',
                text: `Задание с id:${response.message.id} создано`,
                show: true
            });
        }

        globalStateStorage.resetFetchDataParams();
    };

    const updateTask = async () => {
        const response = await processQuery();

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'success',
                text: `Задание с id:${globalStateStorage.updateTaskModal.id} изменено`,
                show: true
            });
        }

        globalStateStorage.resetFetchDataParams();
    };

    const doLogin = async () => {
        const response = await processQuery();

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'info',
                text: 'Успешная авторизация в системе',
                show: true
            });

            globalStateStorage.setUserCredentials(
                { token: response.message.token }
            );
        }

        globalStateStorage.resetFetchDataParams();
    };

    useEffect(() => {
        if (!globalStateStorage.fetchDataParams.action &&
            globalStateStorage.fetchDataParams.sendMethod === 'GET')
        {
            selectTasks();
        } else if (globalStateStorage.fetchDataParams.action === 'create' &&
            globalStateStorage.fetchDataParams.sendMethod === 'POST')
        {
            insertTask();
        } else if (globalStateStorage.fetchDataParams.action === 'login' &&
            globalStateStorage.fetchDataParams.sendMethod === 'POST')
        {
            doLogin();
        } else if (globalStateStorage.fetchDataParams.action.includes('edit') &&
            globalStateStorage.fetchDataParams.sendMethod === 'POST')
        {
            updateTask();
        }
        //eslint-disable-next-line
    }, [globalStateStorage.fetchDataParams]);

    return (
        <AppContext.Provider value={{ globalStateStorage }}>
            <TopHeader />
            <Container className="sav2-main-cont">
                <div>
                    <MainMenu token={globalStateStorage.userCredentials.token} />
                    <br />
                    <InfoBox data={globalStateStorage.infoBox} />
                    <hr />
                    <TableInfo countRows={globalStateStorage.taskList.total_task_count} />
                    <hr />
                    <Paginator
                        curPage={globalStateStorage.fetchDataParams.searchParams.page}
                        perPage={globalStateStorage.taskList.perPage}
                        countRows={globalStateStorage.taskList.total_task_count}
                        onItemClick={handleItemClick}
                        onPrevClick={handleItemClick}
                        onNextClick={handleItemClick}
                        onFirstClick={handleItemClick}
                        onLastClick={handleItemClick} />
                    <TableField tasks={globalStateStorage.taskList.tasks} />
                    <hr />
                    <Paginator
                        curPage={globalStateStorage.fetchDataParams.searchParams.page}
                        perPage={globalStateStorage.taskList.perPage}
                        countRows={globalStateStorage.taskList.total_task_count}
                        onItemClick={handleItemClick}
                        onPrevClick={handleItemClick}
                        onNextClick={handleItemClick}
                        onFirstClick={handleItemClick}
                        onLastClick={handleItemClick} />
                    <br />
                    <br />
                    <InsertTaskModal show={globalStateStorage.insertTaskModal.show} />
                    <UpdateTaskModal data={globalStateStorage.updateTaskModal} />
                    <LoginModal show={globalStateStorage.loginModal.show} />                    
                    <br />
                </div>
            </Container>
            <LightCover isLoading={globalStateStorage.pendingRequest} />
        </AppContext.Provider>
    );
});

export default App;
