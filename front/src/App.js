import React, {Component} from 'react';
import logo from './apm.jpg';
import './App.css';
import MainComponent from './components/Main.js';
import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
    componentDidMount() {
        document.title = "ClouDoc Service";
    }

    render() {
        return (
            <div className="App" style={{height: '100%'}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">ClouDoc Web Service</h1>
                </header>
                <HashRouter>
                    <Switch>
                        <Route render={(props) => (<MainComponent {...props}/>)}/>
                    </Switch>
                </HashRouter>

            </div>
        );
    }
}

export default App;
