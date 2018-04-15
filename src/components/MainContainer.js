import React from 'react';
import Marketplace from  './Marketplace';
import Mint from './Mint';
import MyKitties from './MyKitties';
import AllKitties from './AllKitties';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

const MainContainer = props => (
    <Route>
        <Switch>
            <Redirect path='/' to='/marketplace' exact />
            <Route path='/marketplace' render={(props) => (
                <Marketplace />
            )} />
            <Route path='/mint' render={(props) => (
                <Mint />
            )} />
            <Route path='/all' render={(props) => (
                <AllKitties />
            )} />
            <Route path='/mykitties' render={(props) => (
                <MyKitties />
            )} />
        </Switch>
    </Route>
);

export default MainContainer;
