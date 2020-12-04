import React, { useState } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import './App.css';

import allTasks from "../../Tasks/allTasks";
import {ConvertDecimalToN} from "../../Tasks/positional_radix";

let initialTasks = [...allTasks];
initialTasks = [ConvertDecimalToN]

const createInitialTasks = (setTaskAnswers) => initialTasks.map((task, index) => {
    let taskDescription = task.generate_task();

    return {
        taskClass: task,
        taskDescription,
        taskUpdateAnswer: (userAnswer) => {
            setTaskAnswers((prevTaskAnswers) => {
                let newTaskAnswers = prevTaskAnswers.map((p) => [...p]);
                let correctAnswer = task.solve(taskDescription.params);
                if (Array.isArray(correctAnswer))
                    correctAnswer = correctAnswer[0];
                let isCorrect = correctAnswer.toString() === userAnswer.toString();
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
