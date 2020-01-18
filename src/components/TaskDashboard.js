import React from 'react';
import TaskForm from './TaskForm';
import TimerDisplay from './TimerDisplay';
import FinishedTasks from './FinishedTasks';

const TaskDashboard = () => (
    <div>
        <TimerDisplay />
        <TaskForm />
        <FinishedTasks />
    </div>
);

export default TaskDashboard;