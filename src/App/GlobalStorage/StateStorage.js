import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

export const AppContext = createContext();

export const REST_SERVICE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export const getStateStorage = () => {

    const stateStorage = makeAutoObservable({

        token: null,

        setToken(value) {
            this.token = value;
        },

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

        setSortValues({sort_field, sort_direction}) {
            this.fetchDataParams.searchParams.sort_field = sort_field || this.fetchDataParams.searchParams.sort_field;
            this.fetchDataParams.searchParams.sort_direction = sort_direction || this.fetchDataParams.searchParams.sort_direction;
        },

        setPage(value) {
            this.fetchDataParams.searchParams.page = value;
        },

        setPostData({action, data}) {
            this.fetchDataParams.action = action || this.fetchDataParams.action;
            this.fetchDataParams.data = data || this.fetchDataParams.data;
            this.fetchDataParams.sendMethod = 'POST';
        },

        resetPostData() {
            this.fetchDataParams.action = '';
            this.fetchDataParams.data = {};
            this.fetchDataParams.sendMethod = 'GET';
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
            status: 0
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
