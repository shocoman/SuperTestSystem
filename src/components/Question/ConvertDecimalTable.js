import React, { useState } from 'react';
import { digitToChar } from '../../Tasks/utilities';

export default function ConvertDecimalTable([convertible, radix]) {
    let initTable = [['', '']];
    const [rows, setRows] = useState(initTable);
    let decodedNumber = '';
    if (rows[0][1] !== '') {
        decodedNumber = rows
            .filter(([_, v]) => v !== '')
            .map(([_, v]) => digitToChar(parseInt(v)))
            .reverse()
            .join('');
    }

    const onRowChange = (colNum, rowNum, e) => {
        if (isNaN(Number(e.target.value))) return;
        let value = e.target.value;

        setRows((prevRows) => {
            let newRows = prevRows.map((row) => [...row]);
            newRows[rowNum][colNum] = value;
            return newRows;
        });
    };

    const onRowKeyPressed = (rowNum, e) => {
        if (rowNum === rows.length - 1) {
            if (e.key === 'Enter') {
                setRows((prevRows) => [...prevRows, ['', '']]);
            } else if (e.keyCode === 8 && rows.length > 1 && e.target.value === '') {
                // backspace
                setRows((prevRows) => prevRows.map((r) => [...r]).slice(0, -1));
                e.preventDefault();
            }
        }
    };

    const convertTable = (
        <table className='nes-table is-bordered is-centered'>
            <thead>
                <tr>
                    <td>Делимое</td>
                    <td>Остаток</td>
                </tr>
            </thead>
            <tbody>
                {rows.map(([a, b], i) => (
                    <tr key={i}>
                        <td>
                            <input
                                value={a}
                                onChange={(e) => onRowChange(0, i, e)}
                                onKeyDown={(e) => onRowKeyPressed(i, e)}
                                className={'nes-input'}
                                style={{ textAlign: 'right' }}
                            />
                        </td>
                        <td>
                            <input
                                value={b}
                                onChange={(e) => onRowChange(1, i, e)}
                                onKeyDown={(e) => onRowKeyPressed(i, e)}
                                className={'nes-input'}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div
            style={{ marginTop: '30px' }}
            className={'convertTable nes-container with-title is-centered is-rounded'}
        >
            <p className='title'>Таблица перевода</p>
            {convertTable}
            {decodedNumber !== '' && <div>Возможный ответ: {decodedNumber}</div>}
        </div>
    );
}
