import React from 'react';
import './Question.css';
import ConvertDecimalTable from './ConvertDecimalTable';
import { formatTable } from './EncodingTable';
import { ExpressionEvaluator } from './ExpressionEvaluator';
import HuffmanTree from "./HuffmanTree";

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3,
});

export default function Question({ onchange, value, keyId, status, answer, task }) {
    const className = 'nes-input ' + (status === AnswerStatus.RIGHT ? 'is-success' : '');

    const questionText = task.taskDescription.text;
    return (
        <div className='testCard'>
            <div className='questionText'>
                {questionText.split('\n').map((q, i) => (
                    <div key={i}> {q} </div>
                ))}
                {answer && <div>- Правильный ответ: {answer}</div>}
            </div>

            {task.taskClass.uses_table && formatTable(task.taskDescription.params)}
            {task.taskClass.uses_calculator && ExpressionEvaluator()}
            {task.taskClass.uses_convert_table && ConvertDecimalTable(false, task.taskDescription.params)}
            {task.taskClass.uses_float_convert_table && ConvertDecimalTable(true, task.taskDescription.params)}
            {task.taskClass.uses_huffman_tree && HuffmanTree(task.taskDescription.params)}

            <div className='inputField'>
                <label htmlFor='answerField'> Введите ответ: </label>
                <input
                    name={'answerField'}
                    id={keyId}
                    value={value}
                    onChange={onchange}
                    className={className}
                />
                <i className="my-nes-kirby nes-kirby "/>
            </div>
        </div>
    );
}
