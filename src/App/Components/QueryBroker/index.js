import { useContext, useEffect } from 'react'
import { AppContext } from 'App/GlobalStorage/StateStorage';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import { observer } from 'mobx-react-lite';

export const useToken = (globalStateStorage) => {
    useEffect(() => {
        globalStateStorage.setToken(localStorage.getItem('userToken'));
        //eslint-disable-next-line
    },[]);
    
    useEffect(() => { 
        if(globalStateStorage.token) {
            localStorage.setItem('userToken', globalStateStorage.token);
        } else {
            localStorage.removeItem('userToken');
        }          
    },[globalStateStorage.token]);
};

export const useQueryBroker = (globalStateStorage) => {

    const processQuery = async (operationType) => {
        let jsonResponse = null;
        let errorTitle = '';

        switch(operationType) {
            case 'SELECT':
                errorTitle = ' Ошибка. Вывод данных невозможен. ';
                break;
            case 'INSERT':
                errorTitle = ' Ошибка. Ввод данных невозможен. ';
                break;
            case 'UPDATE':
                errorTitle = ' Ошибка. Изменение данных невозможно. ';
                break;
            case 'LOGIN':
                errorTitle = ' Ошибка авторизации. ';
                break;
            default:
                
        }

        globalStateStorage.setPendingRequest(true);

        const textResponse = await fetchData(globalStateStorage.fetchDataParams);

        const response = {
            message: textResponse,
            methodName: 'App.processQuery()',
            representError: (errorInfo) => {
                globalStateStorage.setInfoBox({
                    variant: 'danger',
                    text: errorTitle + errorInfo,
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
        const response = await processQuery('SELECT');
        globalStateStorage.setTaskList(response.message);
    };

    const insertTask = async () => {
        const response = await processQuery('INSERT');

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'success',
                text: `Задание с id:${response.message.id} создано`,
                show: true
            });
        }

        globalStateStorage.resetPostData();
    };

    const updateTask = async () => {
        const response = await processQuery('UPDATE');

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'success',
                text: `Задание с id:${globalStateStorage.updateTaskModal.id} изменено`,
                show: true
            });
        } else {
            globalStateStorage.setToken(null);
        }

        globalStateStorage.resetPostData();
    };

    const doLogin = async () => {
        const response = await processQuery('LOGIN');

        if (response) {
            globalStateStorage.setInfoBox({
                variant: 'info',
                text: 'Успешная авторизация в системе',
                show: true
            });

            globalStateStorage.setToken(response.message.token);
        }

        globalStateStorage.resetPostData();
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
    }, [
        globalStateStorage.fetchDataParams.action, 
        globalStateStorage.fetchDataParams.data,
        globalStateStorage.fetchDataParams.sendMethod,
        globalStateStorage.fetchDataParams.searchParams.sort_field,
        globalStateStorage.fetchDataParams.searchParams.sort_direction,
        globalStateStorage.fetchDataParams.searchParams.page
    ]); 
};

const QueryBroker = observer(() => {
    const { globalStateStorage } = useContext(AppContext);

    useToken(globalStateStorage);

    useQueryBroker(globalStateStorage);

    return null;
});

export default QueryBroker;
