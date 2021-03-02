import React from 'react';
import './Question.css';
import ConvertDecimalTable from './ConvertDecimalTable';
import { formatTable } from './EncodingTable';
import { Calculator } from './Calculator';
import HuffmanTree from './HuffmanTree';
import _ from 'lodash';
import { UserAnswer } from '../../Tasks/utilities';
import InfoPopup from './InfoPopup';
import FloatRepresentation from './FloatRepresentation/FloatRepresentation';

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3
});

export default function Question({ blockedInput, checkCorrectAnswer, onInputChange, keyId, userAnswer, task }) {

    const onMainInputChange = (e) => {
        let u = _.cloneDeep(userAnswer);
        u.mainAnswer.value = e.target.value;
        onInputChange(u);
    };

    const onAdditionalComponentChange = (answer) => {
        onInputChange(answer);
    };

    let className = 'nes-input ' + (checkCorrectAnswer && userAnswer.mainAnswer.correct ? 'is-success' : '');
    const answerIsIncorrect = blockedInput && className === 'nes-input ';
    if (answerIsIncorrect)
        className += 'is-error';

    return (
        <div className='testCard'>
            <div className='questionText'>
                {task.taskDescription.text}
            </div>

            {task.taskClass.uses_float_grid &&
            (<FloatRepresentation
                params={task.taskDescription.params}
                userAnswer={userAnswer}
                onChange={onAdditionalComponentChange}
                gridSize={32}
                checkCorrectAnswer={checkCorrectAnswer}
            />)
            }
            {task.taskClass.uses_table && formatTable(task.taskDescription.params)}
            {task.taskClass.uses_calculator && Calculator()}
            {task.taskClass.uses_convert_table && (
                <ConvertDecimalTable
                    floatConvert={false}
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                    checkCorrectAnswer={checkCorrectAnswer}
                />
            )}
            {task.taskClass.uses_float_convert_table && (
                <ConvertDecimalTable
                    floatConvert={true}
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                    checkCorrectAnswer={checkCorrectAnswer}
                />
            )}
            {task.taskClass.uses_huffman_tree && (
                <HuffmanTree
                    params={task.taskDescription.params}
                    userAnswer={userAnswer}
                    onChange={onAdditionalComponentChange}
                    checkCorrectAnswer={checkCorrectAnswer}
                    blockedInput={blockedInput}
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
                    disabled={blockedInput}
                />
                <InfoPopup msg={task.taskClass.additionalInformation()} />
                {answerIsIncorrect && userAnswer.mainAnswer.correctAnswer && <div>
                    Правильный ответ: {userAnswer.mainAnswer.correctAnswer}
                </div>}
                <i className='nes-kirby' />
            </div>
        </div>
    );
}
