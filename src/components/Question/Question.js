import React from 'react';
import './Question.css';
import ConvertDecimalTable from './ConvertDecimalTable';
import { formatTable } from './EncodingTable';
import { ExpressionEvaluator } from './ExpressionEvaluator';
import HuffmanTree from './HuffmanTree';
import _ from 'lodash';
import { UserAnswer } from '../../Tasks/utilities';
import InfoPopup from './InfoPopup';
import FloatRepresentation from "./FloatRepresentation/FloatRepresentation";

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3,
});

export default function Question({ onInputChange, keyId, userAnswer, task }) {
    const onMainInputChange = (e) => {
        let u = _.cloneDeep(userAnswer);
        u.mainAnswer.value = e.target.value;
        onInputChange(u);
    };

    const onAdditionalComponentChange = (answer) => {
        onInputChange(answer);
    };

    const className = 'nes-input ' + (userAnswer.mainAnswer.correct ? 'is-success' : '');
    return (
        <div className='testCard'>
            <div className='questionText'>
                {task.taskDescription.text}
            </div>

            {task.taskClass.uses_float_grid &&
                <FloatRepresentation
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                    gridSize={32}
                />
            }
            {task.taskClass.uses_table && formatTable(task.taskDescription.params)}
            {task.taskClass.uses_calculator && ExpressionEvaluator()}
            {task.taskClass.uses_convert_table && (
                <ConvertDecimalTable
                    floatConvert={false}
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                />
            )}
            {task.taskClass.uses_float_convert_table && (
                <ConvertDecimalTable
                    floatConvert={true}
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                />
            )}
            {task.taskClass.uses_huffman_tree && (
                <HuffmanTree
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                />
            )}

            <div className='inputField'>
                <label htmlFor='answerField'> Введите ответ: </label>
                <input
                    name={'answerField'}
                    id={keyId}
                    value={task.userAnswer}
                    onChange={onMainInputChange}
                    className={className}
                />
                <InfoPopup msg={task.taskClass.additionalInformation()} />
                <i className='nes-kirby' />
            </div>
        </div>
    );
}
