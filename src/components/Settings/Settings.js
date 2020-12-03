import React, { useState } from 'react';

function ThemeChooser({ name, id, setChecked }) {
    let [numberEnabled, setNumberEnabled] = useState(false);
    let [text, setText] = useState('0');

    const onChange = (e) => {
        setText('0');
        setNumberEnabled(!numberEnabled);

        setChecked((prevState) => {
            let newState = prevState.map((a) => ({ ...a }));
            newState[id].number = '0';
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
        <div style={{ padding: '5px' }}>
            <input id={'check' + id} type='checkbox' onChange={onChange} />
            <input
                size={5}
                type='number'
                value={text}
                disabled={!numberEnabled}
                min={0}
                pattern={/[\d]*/}
                onChange={onTextEnter}
            />
            <label style={{ padding: '5px' }} htmlFor={'check' + id}>
                {name}
            </label>
        </div>
    );
}

function formatLink(pairs) {
    return (
        'http://localhost:3000/test?' +
        pairs
            .filter((check) => check.number > 0)
            .map((check) => `${check.name.replaceAll(' ', '_')}=${check.number}`)
            .join('&')
    );
}

export default function Settings() {
    const задачи = [
        'Измерение информации',
        'Основы кодирования',
        'Системы счисления',
        'Основы машинной арифметики',
    ];
    let checkedInit = задачи.map((name) => ({
        name,
        number: 0,
    }));
    const [checked, setChecked] = useState(checkedInit);

    const [link, setLink] = useState('');

    return (
        <div>
            <div>Выбери тему и кол-во заданий</div>

            {задачи.map((name, index) => (
                <ThemeChooser
                    name={name}
                    id={index}
                    key={index}
                    setChecked={setChecked}
                />
            ))}
            <button>Create link</button>
            {checked.length !== 0 && (
                <div>
                    Link: <a href={formatLink(checked)}>{formatLink(checked)}</a>
                </div>
            )}
        </div>
    );
}
