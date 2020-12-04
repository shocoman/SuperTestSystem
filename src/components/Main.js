import App from './App/App';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Settings from './Settings/Settings';
import 'nes.css/css/nes.min.css';

export default function Main() {
    return (
        <div className={'root'}>
            <BrowserRouter>
                <div className=' nes-container with-title is-rounded'>
                    <p className='title'>Выбор раздела</p>
                    <Link
                        style={{ marginRight: '-5px' }}
                        className={'nes-btn'}
                        to={'/test'}
                    >
                        Тестирование
                    </Link>
                    <Link className={'nes-btn'} to={'/settings'}>
                        Настройки
                    </Link>

                    <div
                        className='nes-badge'
                        style={{ marginLeft: '100px', width: '400px' }}
                    >
                        <span className='is-success'>Тесты тесты тесты!</span>
                        <i className='nes-icon is-large star'></i>
                    </div>
                </div>

                <Switch>
                    <Route path={['/test']} component={App} />
                    <Route path={['/settings', '/']} component={Settings} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
