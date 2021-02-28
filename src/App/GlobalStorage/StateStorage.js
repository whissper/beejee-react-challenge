import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

export const AppContext = createContext();

export const REST_SERVICE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export const getStateStorage = () => {

    const stateStorage = makeAutoObservable({

        pendingRequest: false,

        setPendingRequest(value) {
            this.pendingRequest = !!value;
        },

        infoBox: {
            variant: 'info',
            text: '',
            show: false
        },

        setInfoBox(values) {
            this.infoBox = { 
                ...this.infoBox, 
                ...values 
            };
        },

        userCredentials: {
            token: null
        },

        setUserCredentials(values) {
            this.userCredentials = { 
                ...this.userCredentials, 
                ...values 
            };
        },

        loginData: {
            username: '',
            password: '',
        },

        setLoginData(values) {
            this.loginData = { 
                ...this.loginData, 
                ...values 
            };
        },

        fetchDataParams: {
            url: REST_SERVICE_URL,
            action: '',
            data: {},
            sendMethod: 'GET',
            searchParams: {
                developer: 'Whissper',
                sort_field: 'id',
                sort_direction: 'asc',
                page: 1
            }
        },

        setFetchDataParams(values) {
            this.fetchDataParams = { 
                ...this.fetchDataParams, 
                ...values 
            };
        },

        resetFetchDataParams() {
            this.fetchDataParams = { 
                ...this.fetchDataParams, 
                action: '',
                data: {},
                sendMethod: 'GET'
            };
        },

        taskList: {
            total_task_count: 0,
            perPage: 3,
            tasks: []
        },

        setTaskList(values) {
            this.taskList = { 
                ...this.taskList, 
                ...values 
            };
        },

        insertTaskModal: {
            show: false
        },

        showInsertTaskModal(value) {
            this.insertTaskModal.show = !!value;
        },

        loginModal: {
            show: false
        },

        showLoginModal(value) {
            this.loginModal.show = !!value;
        },

        updateTaskModal: {
            show: false,
            id: '',
            username: '',
            email: '',
            text: '',
            status: '0'
        },

        showUpdateTaskModal(values) {
            this.updateTaskModal = {
                ...this.updateTaskModal,
                ...values
            };
        }
    });

    return stateStorage;
}
