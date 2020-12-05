import React, { useState } from 'react';

export function ExpressionEvaluator() {
    const [inputNum, setInputNum] = useState('0');

    let evaluationResult = '0';
    try {
        let input = inputNum.replaceAll('log2', 'Math.log2');
        evaluationResult = eval(input);
    } catch (e) {}
    if (typeof evaluationResult === 'object' || evaluationResult === '' || evaluationResult === undefined) {
        evaluationResult = '???';
    }

    return (
        <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            Калькулятор:
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
