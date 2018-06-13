import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ClientComponent from './ClientComponent/ClientComponent';
import HomeComponent from './HomeComponent/HomeComponent';
import EndPointComponent from './EndPointComponent/EndPointComponent';

import './App.css';

class App extends Component {
    render() {
        return(
            <main>
                <Switch>
                    <Route exact path = '/' component={HomeComponent}/>
                    <Route path = '/client/:clientId' component={ClientComponent}/>
                    <Route path = '/endpoint/:endPointId' component={EndPointComponent}/>
                </Switch>
            </main>
        )
    }
}


export default App;
