import React, { useState } from 'react';
import Question, { AnswerStatus } from '../Question/Question';
import './TestBlock.css';
import { powerOfTwo, randBool, randInt } from '../../Tasks/utilities';

class RandRange {
    constructor(a, b, callback) {
        this.a = a;
        this.b = b;
        this.callback = callback;
    }

    getNum() {
        let num = Math.random() * (this.b - this.a) + this.a;
        return this.callback(num);
    }
}

function questinator(getParams) {
    return (strings, ...paramNums) => {
        return () => {
            let [params, answer] = getParams();

            let finalString = [];
            for (let i = 0; i < strings.length; i++) {
                finalString.push(strings[i]);
                if (paramNums[i] !== undefined) {
                    finalString.push(params[paramNums[i]].toString());
                }
            }
            return {
                answer: answer,
                text: finalString.join('')
            };
        };
    };
}


export default function TestBlock({ checkCorrectAnswer, tasks, answers }) {
    const blockInputsAfterBtnPressed = !checkCorrectAnswer;

    const [blockedInput, setBlockedInput] = useState(false);

    const onAnswerEnter = (i, answer) => {
        tasks[i].taskUpdateAnswer(answer);
    };


    let tests = tasks.map((task, i) => (
        <li className={'nes-container is-rounded'} key={i}>
            <div style={{ display: 'inherit', width: 'inherit', top: -15 }} className='nes-badge is-splited'>
                <span style={{ width: '10%' }} className='is-success'>{i + 1}</span>
                <span style={{ width: '90%' }} className='is-dark'>{task.taskClass.taskName}</span>
            </div>
            <Question
                keyId={i}
                task={task}
                onInputChange={(answer) => onAnswerEnter(i, answer)}
                userAnswer={answers[i]}
                checkCorrectAnswer={blockedInput || !blockInputsAfterBtnPressed}
                blockedInput={blockedInput}
            />
        </li>
    ));


    let correctAnswers = answers.filter((a) => a.mainAnswer.correct).length;
    return (
        <div className='App'>
            <ul> {tests} </ul>
            {(blockedInput || !blockInputsAfterBtnPressed) &&
            <div> {correctAnswers} из {answers.length} правильно </div>}

            {(blockedInput || !blockInputsAfterBtnPressed)
            && correctAnswers === answers.length && (
                <section className='icon-list'>
                    <i className='nes-octocat animate' />
                </section>
            )}

            {!checkCorrectAnswer &&
            <button disabled={blockedInput} style={{ width: '50%' }}
                    className={'nes-btn' + (blockedInput ? ' is-disabled' : '')}
                    onClick={() => setBlockedInput(true)}>
                Проверить
            </button>}
        </div>
    );
}
