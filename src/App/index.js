import React from 'react';
import './App.css';
import { AppContext, getStateStorage } from 'App/GlobalStorage/StateStorage';
import { Container } from 'react-bootstrap';
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
import QueryBroker from 'App/Components/QueryBroker';


const globalStateStorage = getStateStorage();

const App = () => {

    return (
        <AppContext.Provider value={{ globalStateStorage }}>
            <TopHeader />
            <Container className="sav2-main-cont">
                <div>
                    <MainMenu />
                    <br />
                    <InfoBox />
                    <hr />
                    <TableInfo />
                    <hr />
                    <Paginator />
                    <TableField />
                    <hr />
                    <Paginator />
                    <br />
                    <br />
                    <InsertTaskModal />
                    <UpdateTaskModal />
                    <LoginModal />                    
                    <br />
                </div>
            </Container>
            <LightCover />
            <QueryBroker />
        </AppContext.Provider>
    );
};

export default App;
