import React, { useState } from 'react';
import './Settings.css'

import allTasks from '../../Tasks/allTasks';

let initialTasks = [...allTasks];

function ThemeChooser({ name, id, setChecked }) {
    let [numberEnabled, setNumberEnabled] = useState(false);
    let [text, setText] = useState('0');

    const onChange = (e) => {
        setText(numberEnabled ? '0' : '1');
        setNumberEnabled(!numberEnabled);

        setChecked((prevState) => {
            let newState = prevState.map((a) => ({ ...a }));
            newState[id].number = numberEnabled ? '0' : '1';
            return newState;
        });
    };

    const onTextEnter = (e) => {
        setText(e.target.value);

        let val = e.target.value;
        setChecked((prevState) => {
            let newState = prevState.map((a) => ({ ...a }));
            newState[id].number = numberEnabled ? val : '0';
            return newState;
        });
    };

    return (
        <div>
            <label>
                <input
                    size={3}
                    type='number'
                    value={text}
                    disabled={!numberEnabled}
                    min={0}
                    pattern={/[\d]*/}
                    onChange={onTextEnter}
                    className={'nes-input'}
                    style={{ borderImageOutset: 0, margin: 1 }}
                />
            </label>
            <label>
                <input
                    id={'check' + id}
                    type='checkbox'
                    onChange={onChange}
                    className={'nes-checkbox'}
                />
                <span>{name}</span>
            </label>
        </div>
    );
}

function formatLink(pairs) {
    let mainLink = `${window.location.origin}/test`;

    let params = pairs
        .filter((check) => check.number > 0)
        .map((check) => `${check.name.replaceAll(' ', '_')}=${check.number}`)
        .join('&');
    if (params.length > 0) {
        mainLink += '?' + params;
    }
    return mainLink;
}

export default function Settings() {
    // const задачи = [
    //     'Измерение информации',
    //     'Основы кодирования',
    //     'Системы счисления',
    //     'Основы машинной арифметики',
    // ];

    const задачи = initialTasks.map((a) => a.taskName ?? a.name);
    let checkedInit = задачи.map((name) => ({
        name,
        number: 0,
    }));
    const [checked, setChecked] = useState(checkedInit);

    return (
        <div style={{marginTop: 10}} className={'nes-container is-rounded with-title task-list'}>
            <div className={'title'}>Выбери тему и кол-во заданий</div>

            {задачи.map((name, index) => (
                <ThemeChooser name={name} id={index} key={index} setChecked={setChecked} />
            ))}
            {checked.length !== 0 && (
                <div className={'nes-text is-error'}>
                    Ссылка:
                    <a href={formatLink(checked)}>{formatLink(checked)}</a>
                </div>
            )}
        </div>
    );
}
