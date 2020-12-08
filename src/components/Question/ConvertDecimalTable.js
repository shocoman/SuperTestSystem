import React, { useState } from 'react';
import { digitToChar } from '../../Tasks/utilities';
import _ from 'lodash';

export default function ConvertDecimalTable({
    floatConvert,
    params: [convertible, radix],
    userAnswer,
    onChange,
}) {
    const emptyRow = [
        { value: '', correct: false },
        { value: '', correct: false },
    ];
    // const [rows, setRows] = useState([]);
    let rows = userAnswer.additionalProperties?.table ?? [emptyRow];

    const setRows = (getNewRows) => {
        let answer = _.cloneDeep(userAnswer);
        answer.additionalProperties.table = getNewRows(rows);
        onChange(answer);
    };

    let decodedNumber = '';
    if (rows[0] && rows[0][1].value !== '') {
        if (floatConvert)
            decodedNumber =
                '0.' +
                rows
                    .filter(([{ value: k }, _]) => k !== '')
                    .map(([{ value: k }, _]) => digitToChar(parseInt(k)))
                    .join('');
        else
            decodedNumber = rows
                .filter(([_, { value: v }]) => v !== '')
                .map(([_, { value: v }]) => digitToChar(parseInt(v)))
                .reverse()
                .join('');
    }

    const onRowChange = (colNum, rowNum, e) => {
        if (isNaN(Number(e.target.value))) return;
        let value = e.target.value;

        setRows((prevRows) => {
            // let newRows = prevRows.map((row) => [...row]);
            let newRows = _.cloneDeep(prevRows);
            newRows[rowNum][colNum].value = value;
            return newRows;
        });
    };

    const onRowKeyPressed = (rowNum, e) => {
        if (rowNum === rows.length - 1) {
            if (e.key === 'Enter') {
                setRows((prevRows) => [..._.cloneDeep(prevRows), _.cloneDeep(emptyRow)]);
            } else if (e.keyCode === 8 && rows.length > 1 && e.target.value === '') {
                // backspace
                setRows((prevRows) => _.cloneDeep(prevRows).slice(0, -1));
                // prevRows.map((r) => [...r]).slice(0, -1));
                e.preventDefault();
            }
        }
    };

    const convertTable = (
        <table className='nes-table is-bordered is-centered'>
            <caption style={{ captionSide: 'top' }}>Таблица перевода</caption>
            <thead>
                {floatConvert ? (
                    <tr>
                        <td>Целая часть</td>
                        <td>
                            Дробная часть ({convertible} * {radix})
                        </td>
                    </tr>
                ) : (
                    <tr>
                        <td>Делимое</td>
                        <td>Остаток</td>
                    </tr>
                )}
            </thead>
            <tbody>
                {rows.map(
                    ([{ value: a, correct: a_correct }, { value: b, correct: b_correct }], i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    value={a}
                                    onChange={(e) => onRowChange(0, i, e)}
                                    onKeyDown={(e) => onRowKeyPressed(i, e)}
                                    className={'nes-input ' + (a_correct ? 'is-success' : '')}
                                    style={{ textAlign: 'right' }}
                                />
                            </td>
                            <td>
                                <input
                                    value={b}
                                    onChange={(e) => onRowChange(1, i, e)}
                                    onKeyDown={(e) => onRowKeyPressed(i, e)}
                                    className={'nes-input ' + (b_correct ? 'is-success' : '')}
                                />
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );

    return (
        <div className={'convertTable '}>
            {convertTable}
            {decodedNumber !== '' && <div>Возможный ответ: {decodedNumber}</div>}
        </div>
    );
}
