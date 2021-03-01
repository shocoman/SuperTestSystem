import React, { useState } from 'react';
import './Settings.css';
import getAllTasks from '../../Tasks/_LoadAllTasks';

let allTasks = getAllTasks();
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

function formatLink(pairs, showCorrectAnswersChecked) {
    let mainLink = `${window.location.origin}`;

    let params = pairs
        .filter((check) => check.number > 0)
        .map((check) => `${check.name.replaceAll(' ', '_')}=${check.number}`)
        .join('&');
    if (params.length > 0) {
        mainLink += '?' + params;
        console.log(showCorrectAnswersChecked);
        if (showCorrectAnswersChecked)
            mainLink += '&dontCheckCorrectAnswers=YES';
    } else if (showCorrectAnswersChecked) {
        mainLink += '?dontCheckCorrectAnswers=YES';
    }

    return mainLink;
}

export default function Settings() {

    const задачи = initialTasks.map((a) => a.taskName ?? a.name);
    let checkedInit = задачи.map((name) => ({
        name,
        number: 0
    }));
    const [checked, setChecked] = useState(checkedInit);
    const [showCorrectAnswersChecked, setShowCorrectAnswersChecked] = useState(false);
    const showCorrectAnswerCheckBox = (<div>
        <label>
            <input
                type='checkbox'
                onChange={(e) => setShowCorrectAnswersChecked(e.target.checked)}
                className={'nes-checkbox'}
            />
            <span> Не оценивать правильность решения во время ввода</span>
        </label>
    </div>);

    return (
        <div style={{ marginTop: 10 }} className={'nes-container is-rounded with-title task-list'}>
            <div className={'title'}>Выбери тему и кол-во заданий</div>


            {задачи.map((name, index) => (
                <ThemeChooser name={name} id={index} key={index} setChecked={setChecked} />
            ))}
            {showCorrectAnswerCheckBox}

            {checked.length !== 0 && (
                <div className={'nes-text is-error'}>
                    Ссылка:
                    <a href={formatLink(checked, showCorrectAnswersChecked)}>{formatLink(checked, showCorrectAnswersChecked)}</a>
                </div>
            )}
        </div>
    );
}
