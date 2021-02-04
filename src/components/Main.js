import App from './App/App';
import React from 'react';
import { Link, Route, Switch, HashRouter } from 'react-router-dom';
import Settings from './Settings/Settings';
import 'nes.css/css/nes.min.css';
import _ from "lodash";


export default function Main() {

    return (
        <div className={'root'}>
            <HashRouter>
                <div className=' nes-container with-title is-rounded'>
                    <p className='title'>Выбор раздела</p>
                    <Link style={{ marginRight: '-5px' }} className={'nes-btn'} to={'/'}>
                        Тестирование
                    </Link>
                    <Link className={'nes-btn'} to={'/settings'}>
                        Настройки
                    </Link>

                    <div className='nes-badge' style={{ marginLeft: '100px', width: '400px' }}>
                        <span className='is-success'>Тесты-тесты-тесты!</span>
                        <i className='nes-icon is-large star'/>
                    </div>
                </div>

                <Switch>
                    <Route path={['/settings']} component={Settings} />
                    <Route path={['/']} component={App} />
                </Switch>
            </HashRouter>
        </div>
    );
}
