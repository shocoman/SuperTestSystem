import React, { useState } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import './App.css';

import allTasks from "../../Tasks/allTasks";
import {ConvertDecimalFloatToN, ConvertDecimalToN} from "../../Tasks/positional_radix";
import {HuffmanEncoding} from "../../Tasks/basic_encoding";

let initialTasks = [];
initInitialTasks(initialTasks)

function initInitialTasks(initialTasks) {
    let url = new URL(window.location.href);
    let topics = {};
    for (let [k, v] of url.searchParams) {
        if (v === '') continue;
        let name = k.replaceAll('_', ' ');
        topics[name] = parseInt(v);
    }
    for (let t of allTasks) {
        if (t.taskName in topics) {
            for (let i = 0; i < topics[t.taskName]; ++i) {
                initialTasks.push(t);
            }
        }
    }

    if (initialTasks.length === 0) {
        // initialTasks.push(...allTasks);
        // initialTasks.push(ConvertDecimalToN);
        // initialTasks.push(HuffmanEncoding);
        initialTasks.push(ConvertDecimalFloatToN);
    }
}

const createInitialTasks = (setTaskAnswers) => initialTasks.map((task, index) => {
    let taskDescription = task.generate_task();

    return {
        taskClass: task,
        taskDescription,
        taskUpdateAnswer: (userAnswer) => {
            setTaskAnswers((prevTaskAnswers) => {
                let newTaskAnswers = prevTaskAnswers.map((p) => [...p]);
                let isCorrect;
                if (task.hasOwnProperty('check_solution')) {
                    isCorrect = task.check_solution(taskDescription.params, userAnswer.toString());
                } else {
                    let correctAnswer = task.solve(taskDescription.params);
                    if (Array.isArray(correctAnswer))
                        correctAnswer = correctAnswer[0];
                    isCorrect = correctAnswer.toString() === userAnswer.toString();
                }

                newTaskAnswers[index] = [userAnswer, isCorrect];
                return newTaskAnswers;
            });
        },
    };
});

function App() {
    const [taskAnswers, setTaskAnswers] = useState(new Array(initialTasks.length).fill(0).fill([0, false]));
    const [tasks, setTasks] = useState(_ => createInitialTasks(setTaskAnswers));

    return (
        <div className={'root'}>
            <div className='TestBlock'>
                <TestBlock tasks={tasks} answers={taskAnswers} />
            </div>
        </div>
    );
}

export default App;
