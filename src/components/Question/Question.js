import React, { useState } from 'react';
import './Question.css';

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3,
});

function formatTable(table) {
    return (
        <div style={{ margin: '10px' }}>
            <table
                className='nes-table is-bordered is-centered'
                style={{ margin: 'auto' }}
            >
                <thead>
                    <tr>
                        <td> Символ</td>
                        {Object.entries(table.from_table).map(([k, v], i) => {
                            return <td key={i}> {v} </td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Подстановка</td>
                        {Object.entries(table.from_table).map(([k, v], i) => {
                            return <td key={i}> {k} </td>;
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function LogarithmCalculator() {
    const [inputNum, setInputNum] = useState('0');

    return (
        <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            Log2(
            <input
                className={'nes-input'}
                style={{ width: '8rem', borderImageOutset: 0 }}
                value={inputNum}
                onChange={(e) => setInputNum(e.target.value)}
                pattern={'^[0-9]*$'}
            />
            ) = <label> {Math.log2(parseInt(inputNum))} </label>
        </div>
    );
}


function ConvertTable() {

}


export default function Question({
    onchange,
    value,
    keyId,
    status,
    answer,
    task,
}) {
    const className =
        'nes-input ' + (status === AnswerStatus.RIGHT ? 'is-success' : '');

    const questionText = task.taskDescription.text;
    return (
        <div className='testCard'>
            <div className='questionText'>
                {questionText.split('\n').map((q, i) => (
                    <div key={i}> {q} </div>
                ))}
                {answer && <div>- Правильный ответ: {answer}</div>}
            </div>

            {task.taskClass.uses_table &&
                formatTable(task.taskDescription.params[1])}
            {task.taskClass.uses_logarithm_calculator && LogarithmCalculator()}
            <div className='inputField'>
                <label htmlFor='answerField'> Введите ответ: </label>
                <input
                    name={'answerField'}
                    id={keyId}
                    value={value}
                    onChange={onchange}
                    className={className}
                />
            </div>
        </div>
    );
}
