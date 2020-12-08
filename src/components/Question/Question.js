import React from 'react';
import './Question.css';
import ConvertDecimalTable from './ConvertDecimalTable';
import { formatTable } from './EncodingTable';
import { ExpressionEvaluator } from './ExpressionEvaluator';
import HuffmanTree from './HuffmanTree';
import _ from 'lodash';
import { UserAnswer } from '../../Tasks/utilities';

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3,
});

export default function Question({ onInputChange, keyId, userAnswer, task }) {
    const onChange = (e) => {
        let u = _.cloneDeep(userAnswer);
        u.mainAnswer.value = e.target.value;
        onInputChange(u);
    };

    const className = 'nes-input ' + (userAnswer.mainAnswer.correct ? 'is-success' : '');
    return (
        <div className='testCard'>
            <div className='questionText'>{task.taskDescription.text}</div>

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
                    value={task.userAnswer}
                    onChange={onChange}
                    className={className}
                />
                <i className='my-nes-kirby nes-kirby ' />
            </div>
        </div>
    );
}
