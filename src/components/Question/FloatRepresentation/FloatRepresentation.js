import React, { useState } from 'react';
import InpuxBoxes from './InputBoxes/InputBoxesComponent';
import Slider, { Range } from 'rc-slider';
import './SliderHandle.css';
import _ from 'lodash';

export default function FloatRepresentation({
                                                params: [toConvert], userAnswer, onChange, gridSize
                                            }) {
    let answer = _.cloneDeep(userAnswer);
    if (answer.additionalProperties.float_grid === undefined)
        answer.additionalProperties.float_grid = {};

    let enteredNumberIsCorrect = userAnswer.additionalProperties?.float_grid?.correct ?? false;
    let selectedBitsAreCorrect = userAnswer.additionalProperties?.float_grid?.bitsCorrect ?? false;


    const [marks, setMarks] = useState(() => {
        let marks = {};
        for (let i = 0; i < gridSize + 1; ++i) {
            let l = i * 100 / (gridSize);
            marks[l] = i;
        }
        return marks;
    });

    const [selectedInput, setSelectedInput] = useState([-1, -1]);
    const [enteredNumber, setEnteredNumber] = useState(''.padEnd(gridSize, '0'));
    const [selectedBits, setSelectedBits] = useState([-1, -1]);


    const slideOnChange = (values) => {
        const rounded_vals = values.map(v => Math.floor(((100 - v) / 100) * (gridSize + 1)));
        setSelectedInput(rounded_vals);
        setSelectedBits(rounded_vals.map(v => 32 - v));
        answer.additionalProperties.float_grid.selectedBits = rounded_vals.map(v => 32 - v);
        onChange(answer);
    };

    const inputChanged = (val) => {
        setEnteredNumber(val);
        answer.additionalProperties.float_grid.enteredNumber = val;
        onChange(answer);
    };

    let range = [Math.min(...selectedInput), Math.max(...selectedInput)];
    let inputProps = {};
    for (let i = 0; i < gridSize; i++) {
        inputProps[i] = { placeholder: '0' };
        if (i === range[0] || i === range[1]) {
            inputProps[i].style = { color: 'greenyellow' };
        } else if (i > range[0] && i < range[1]) {
            inputProps[i].style = { color: 'green' };
        }
    }

    return (
        <>
            <div style={{ marginTop: '20px', marginBottom: '40px' }}>
                <div>
                    <InpuxBoxes
                        amount={gridSize}
                        // autoFocus
                        handleOutputString={inputChanged}
                        inputProps={inputProps}
                        inputRegExp={/^[0-1]$/}
                    />
                </div>

                <Range
                    marks={marks} step={100 / gridSize}
                    onChange={slideOnChange}
                    reverse={true}
                />

            </div>

            {<div>Возможный ответ: {enteredNumber}</div>}
            {selectedBitsAreCorrect && <div style={{ color: 'green' }}>Биты для экспоненты выбраны верно</div>}
            {enteredNumberIsCorrect && <div style={{ color: 'green' }}>Разрядная сетка построена верно</div>}

        </>
    );
}