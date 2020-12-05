import React from 'react';

export function formatTable([_, table]) {
    return (
        <div style={{ margin: '10px' }}>
            <table
                className='nes-table is-bordered is-centered with-title'
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