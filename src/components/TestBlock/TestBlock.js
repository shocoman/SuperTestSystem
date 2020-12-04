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
                text: finalString.join(''),
            };
        };
    };
}

const infQuestions = [
    questinator(() => {
        let num = new RandRange(1, 11, (n) => n | 0).getNum();
        return [[num], Math.pow(2, num)];
    })`Из скольких букв состоит равновероятный алфавит, если одна буква этого алфавита несет ${0} бита информации?`,

    questinator(() => {
        let a = new RandRange(4, 8, (n) => Math.pow(2, n | 0)).getNum();
        let b = new RandRange(3, 7, (n) => Math.log2(a | 0) * (n | 0)).getNum();

        let ans = b / Math.log2(a | 0);
        return [[a, b], ans];
    })`Сообщение составлено из символов равновероятного алфавита. Чему равно количество символов в этом сообщении, если известно, что алфавит состоит из ${0} символов, а сообщение несет ${1} бита информации`,

    questinator(() => {
        let a = new RandRange(2, 12, powerOfTwo).getNum();
        let b = new RandRange(2, 12, powerOfTwo).getNum();
        let c = new RandRange(1, 6, powerOfTwo).getNum();

        let ans = a * b * Math.log2(c);
        return [[a, b, c], ans];
    })`Какое количество информации заключается в черно-белом изображении на телеэкране, если экран содержит ${0} линий, каждая линия – ${1} экранных точек, а каждая точка имеет ${2} градаций яркости?`,

    questinator(() => {
        let a = new RandRange(2, 100, (n) => n | 0).getNum();
        let b = new RandRange(1, 6, powerOfTwo).getNum();
        let ans = a * Math.log2(b);
        return [[a, b], ans];
    })`Определить максимальную энтропию системы, состоящей из ${0} элементов, каждый из которых может находиться в одном из ${1}-х состояний.`,
];
const encodingQuestions = [
    questinator(() => {
        let a = new RandRange(5, 70, (n) => n | 0).getNum();
        let b = new RandRange(7, 20, (n) => n | 0).getNum();
        let amountInfo = Math.floor(Math.log2(a) * b * 100) / 100;
        let volumeInfo = Math.ceil(Math.log2(a)) * b;
        return [[a, b], [amountInfo, volumeInfo].join(';')];
    })`Составить равномерный двоичный код для передачи сообщений некоторого ${0}-буквенного алфавита. Чему равны количество и объем информации при передачи ${1}-буквенного слова этого алфавита, если все его символы равновероятны? Округлить до сотых.`,

    questinator(() => {
        let a = new RandRange(8, 88, (n) => n | 0).getNum();
        let ternary = Math.ceil(Math.log2(a) / Math.log2(3));
        let binary = Math.ceil(Math.log2(a));
        return [[a], [ternary, binary].join(';')];
    })`Определить минимальную разрядность равномерного троичного кода для кодирования алфавита из ${0} букв. Как изменится результат, если код будет двоичным?`,

    questinator(() => {
        let letterSubs = [
            ['A', 'H'],
            ['B', 'G'],
            ['C', 'F'],
            ['D', 'E'],
            ['E', 'D'],
            ['F', 'C'],
            ['G', 'B'],
            ['H', 'A'],
        ];

        let a = '';
        let ans = '';
        for (let i = 0; i < 5; i++) {
            let index = (Math.random() * letterSubs.length) | 0;
            a += letterSubs[index][0];
            ans += letterSubs[index][1];
        }

        return [[a], ans];
    })`Закодировать сообщение ${0} с помощью шифров простой замены: \n A B C D E F G H \n H G F E D C B A`,
];
const radixQuestions = [
    questinator(() => {
        let example = '101.111';
        let lLen = randInt(2, 5);
        let rLen = randInt(2, 5);

        let ans = 0;
        let lString = '';
        for (let i = 0; i < lLen; i++) {
            let b = randBool();
            if (b || i === 0) {
                lString += '1';
                ans += Math.pow(2, lLen - i - 1);
            } else {
                lString += '0';
            }
        }

        let rString = '';
        for (let i = 0; i < rLen; i++) {
            let b = randBool();
            if (b) {
                rString += '1';
                ans += Math.pow(2, -i - 1);
            } else {
                rString += '0';
            }
        }

        return [[lString + '.' + rString], ans];
    })`Перевести число ${0} из двоичной в десятичную систему счисления`,

    questinator(() => {
        let example = '101.111';
        let lLen = randInt(2, 5);
        let rLen = randInt(2, 5);

        let ans = 0;
        let lString = '';
        for (let i = 0; i < lLen; i++) {
            let b = randBool();
            if (b || i === 0) {
                lString += '1';
                ans += Math.pow(2, lLen - i - 1);
            } else {
                lString += '0';
            }
        }

        let rString = '';
        for (let i = 0; i < rLen; i++) {
            let b = randBool();
            if (b) {
                rString += '1';
                ans += Math.pow(2, -i - 1);
            } else {
                rString += '0';
            }
        }

        return [[ans], lString + '.' + rString];
    })`Перевести число ${0} из десятичной в двоичную систему счисления`,

    questinator(() => {
        let lLen = randInt(2, 5);
        let rLen = randInt(2, 5);

        let ans = 0;
        let lString = '';
        for (let i = 0; i < lLen; i++) {
            let b = randBool();
            if (b || i === 0) {
                lString += '1';
                ans += Math.pow(2, lLen - i - 1);
            } else {
                lString += '0';
            }
        }

        let rString = '';
        for (let i = 0; i < rLen; i++) {
            let b = randBool();
            if (b) {
                rString += '1';
                ans += Math.pow(2, -i - 1);
            } else {
                rString += '0';
            }
        }
        let a = lString + '.' + rString;

        lString = '';
        for (let i = 0; i < lLen; i++) {
            let b = randBool();
            if (b || i === 0) {
                lString += '1';
                ans += Math.pow(2, lLen - i - 1);
            } else {
                lString += '0';
            }
        }

        rString = '';
        for (let i = 0; i < rLen; i++) {
            let b = randBool();
            if (b) {
                rString += '1';
                ans += Math.pow(2, -i - 1);
            } else {
                rString += '0';
            }
        }
        let b = lString + '.' + rString;

        return [[a, b], ans];
    })`Сложить числа ${0} и ${1} в двоичной СС в столбик и перевести результат в десятичную систему счисления`,
];
const machineArithm = [
    questinator(() => {
        let lLen = randInt(2, 5);
        let rLen = randInt(2, 5);

        let ans = 0;
        let lString = '';
        for (let i = 0; i < lLen; i++) {
            let b = randBool();
            if (b || i === 0) {
                lString += '1';
                ans += Math.pow(2, lLen - i - 1);
            } else {
                lString += '0';
            }
        }

        let rString = '';
        for (let i = 0; i < rLen; i++) {
            let b = randBool();
            if (b) {
                rString += '1';
                ans += Math.pow(2, -i - 1);
            } else {
                rString += '0';
            }
        }

        let defaultNum = lString + '.' + rString;
        let reverseCode = defaultNum
            .split('')
            .map((ch) => (ch === '1' ? '0' : ch === '0' ? '1' : ch))
            .join('');
        let complementCode = '';
        let firstZeroAtIndex = reverseCode
            .split('')
            .reverse()
            .findIndex((e) => e === '0');

        let fstZero = reverseCode.length - firstZeroAtIndex - 1;
        if (firstZeroAtIndex < 0) {
            complementCode = '1' + reverseCode;
        } else {
            for (let i = 0; i < reverseCode.length; i++) {
                if (reverseCode[i] === '.') complementCode += reverseCode[i];
                else if (i < fstZero) complementCode += reverseCode[i];
                else if (i === fstZero) complementCode += '1';
                else complementCode += '0';
            }
        }

        return [
            [defaultNum],
            [defaultNum, reverseCode, complementCode].join(';'),
        ];
    })`Записать прямой, дополнительный и обратный код для двоичного числа ${0}. В качестве разделителя использовать точку с запятой`,
];




export default function TestBlock({ tasks, answers }) {
    const onAnswerEnter = (i, event) => {
        tasks[i].taskUpdateAnswer(event.target.value);
    };


    let tests = tasks.map((task, i) => (
        <li className={'nes-container is-rounded'} key={i}>

            <Question
                value={task.userAnswer}
                keyId={i}
                task={tasks[i]}
                questionText={tasks[i].taskDescription.text}
                onchange={(event) => onAnswerEnter(i, event)}
                status={answers[i][1] ? AnswerStatus.RIGHT : AnswerStatus.NONE}
            />
        </li>
    ));

    let correctAnswers = answers.filter((a) => a[1]).length;
    return (
        <div className='App'>
            <ul> {tests} </ul>
            <div>
                {correctAnswers} из {answers.length} правильно
            </div>

            {correctAnswers === answers.length && (
                <section className='icon-list'>
                    <i className='nes-octocat animate'/>
                </section>
            )}
        </div>
    );
}
