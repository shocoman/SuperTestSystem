import React, { useState } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import './App.css';
import _ from 'lodash';

import getAllTasks from '../../Tasks/_LoadAllTasks';
import { UserAnswer } from '../../Tasks/utilities';

let allTasks = getAllTasks();

let initialTasks = [];
initInitialTasks(initialTasks);

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
        initialTasks.push(...allTasks);
    }
}

const createInitialTasks = (setTaskAnswers) =>
    initialTasks.map((task, index) => {
        let taskDescription = task.generateTask();

        return {
            taskClass: task,
            taskDescription,
            taskUpdateAnswer: (userAnswer) => {
                setTaskAnswers((prevTaskAnswers) => {
                    let taskAnswers = _.cloneDeep(prevTaskAnswers);
                    taskAnswers[index] = task.checkAnswerAndReduce(taskDescription, userAnswer);
                    return taskAnswers;
                });
            },
        };
    });

function App() {
    const [taskAnswers, setTaskAnswers] = useState(
        new Array(initialTasks.length).fill(0).map((_) => new UserAnswer())
    );
    const [tasks, setTasks] = useState((_) => createInitialTasks(setTaskAnswers));

    return (
        <div className={'root'}>
            <div className='TestBlock'>
                <TestBlock tasks={tasks} answers={taskAnswers} />
            </div>
        </div>
    );
}

export default App;
