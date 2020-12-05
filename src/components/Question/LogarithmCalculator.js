import React, { useState } from 'react';

export function LogarithmCalculator() {
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