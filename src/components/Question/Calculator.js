import React, { useState } from 'react';
import InfoPopup from './InfoPopup';

export function Calculator() {
    const [inputNum, setInputNum] = useState('0');

    let evaluationResult = '0';
    try {
        evaluationResult = eval(inputNum);
    } catch (e) {}
    if (typeof evaluationResult === 'object' || evaluationResult === '' || evaluationResult === undefined) {
        evaluationResult = '???';
    }

    const helpMsg = "Введите выражение, которое хотите посчитать (например, '2 + 2'). Использование математических функций происходит через модуль Math, т.е. если вам нужно посчитать логарифм по основанию 2, введите 'Math.log2(16)'";

    return (
        <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            Калькулятор:
            <InfoPopup msg={helpMsg} scale={1.5} dir={'right'} width={700} />
            <input
                className={'nes-input'}
                style={{ width: '19rem', borderImageOutset: 0 }}
                value={inputNum}
                onChange={(e) => setInputNum(e.target.value)}
                // pattern={'^[0-9]*$'}
            />
            = <label> {evaluationResult} </label>
        </div>
    );
}
