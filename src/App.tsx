import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {HomePage, DetailPage} from "./pages";

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={"/detail/:touristRouteId"} component={DetailPage}></Route>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;
