import React from 'react';
import TaskForm from './TaskForm';
import TimerDisplay from './TimerDisplay';
import FinishedTasks from './FinishedTasks';

const PomodoroApp = () => (
    <div>
        <TimerDisplay />
        <TaskForm />
        <FinishedTasks />
    </div>
);

export default PomodoroApp;