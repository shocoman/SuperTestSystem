import App from './App/App';
import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Settings from "./Settings/Settings";

export default function Main() {
    return (
        <BrowserRouter>

            <Link to={'/test'}> <span>Test</span>  </Link>
            <Link to={'/settings'}> <span>Settings</span></Link>

            <Switch>
                <Route path={['/test', ]} component={App}/>
                <Route path={['/settings', '/']} component={Settings}/>
            </Switch>
        </BrowserRouter>
    );
}
