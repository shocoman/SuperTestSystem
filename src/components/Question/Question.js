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

function ConvertDecimalTable([convertible, radix]) {
    const [fstColData, setFstColData] = useState([convertible.toString()]);
    const [sndColData, setSndColData] = useState(['']);

    let initTable = [['22', '33']];
    const [rows, setRows] = useState(initTable);

    const onColChange = (colNum, rowNum, e) => {
        if (isNaN(Number(e.target.value))) return;
        let value = e.target.value;

        if (colNum === 1) {
            setFstColData((prevData) => {
                let d = [...prevData];
                d[rowNum] = value;
                return d;
            });

            if (
                rowNum === fstColData.length - 1 &&
                sndColData.length === fstColData.length - 1
            ) {
                setSndColData((prevData) => {
                    let d = [...prevData];
                    d.push('');
                    return d;
                });
            } else if (
                e.target.value === '' &&
                rowNum < fstColData.length - 1
            ) {
                setFstColData((prevData) => {
                    return prevData.slice(0, rowNum + 1);
                });
                setSndColData((prevState) => {
                    return prevState.slice(0, rowNum + 1);
                });
            }
        } else {
            setSndColData((prevData) => {
                let d = [...prevData];
                d[rowNum] = value;
                return d;
            });

            if (
                rowNum === fstColData.length - 1 &&
                Number.parseInt(fstColData.slice(-1)[0]) >= radix
            ) {
                setFstColData((prevData) => {
                    let d = [...prevData];
                    d.push('');
                    return d;
                });
            } else if (
                e.target.value === '' &&
                rowNum < fstColData.length - 1
            ) {
                setFstColData((prevData) => {
                    return prevData.slice(0, rowNum + 2);
                });
                setSndColData((prevState) => {
                    return prevState.slice(
                        0,
                        Math.min(rowNum + 2, sndColData.length)
                    );
                });
            }
        }
    };

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
                setRows(prevRows => [...prevRows, ['', '']]);
            } else if (e.keyCode === 8 && rows.length > 1 && e.target.value === '') { // backspace
                setRows(prevRows => prevRows.map(r => [...r]).slice(0, -1));
                e.preventDefault()
            }
        }
    };


    const convertTable = <table className='nes-table is-bordered is-centered'>
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
                        onKeyDown={(e) => onRowKeyPressed(i, e) }
                        className={'nes-input'}
                        style={{ textAlign: 'right' }}
                    />
                </td>
                <td>
                    <input
                        value={b}

                        onChange={(e) => onRowChange(1, i, e)}
                        onKeyDown={(e) => onRowKeyPressed(i, e) }
                        className={'nes-input'}
                    />
                </td>
            </tr>
        ))}
        </tbody>
    </table>

    return (
        <div
            style={{ marginTop: '30px' }}
            className={
                'convertTable nes-container with-title is-centered is-rounded'
            }
        >
            <p className='title'>Таблица перевода</p>

            {convertTable}

            {/*<div className='twoCols'>*/}
            {/*    <div className={'firstCol'}>*/}
            {/*        Делимое:*/}
            {/*        {fstColData.map((el, i) => (*/}
            {/*            <input*/}
            {/*                type={'text'}*/}
            {/*                key={i}*/}
            {/*                value={el}*/}
            {/*                onChange={(e) => onColChange(1, i, e)}*/}
            {/*                className={'nes-input'}*/}
            {/*                style={{*/}
            {/*                    borderImageOutset: 0,*/}
            {/*                    marginBottom: '-15px',*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*    <div className={'secondCol'}>*/}
            {/*        Остаток:*/}
            {/*        {sndColData.map((el, i) => (*/}
            {/*            <input*/}
            {/*                key={i}*/}
            {/*                value={el}*/}
            {/*                onChange={(e) => onColChange(2, i, e)}*/}
            {/*                className={'nes-input'}*/}
            {/*                style={{*/}
            {/*                    borderImageOutset: 0,*/}
            {/*                    marginBottom: '-15px',*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    Предполагаемый ответ:*/}
            {/*    <b>*/}
            {/*        {[...sndColData]*/}
            {/*            .reverse()*/}
            {/*            .reduce((acc, el) => acc + el, '') || '???'}*/}
            {/*    </b>*/}
            {/*</div>*/}
        </div>
    );
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
            {task.taskClass.uses_convert_table &&
                ConvertDecimalTable(task.taskDescription.params)}

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
