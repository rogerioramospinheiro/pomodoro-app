import React from 'react';
import { connect } from 'react-redux';
import FinishedTaskItem from './FinishedTaskItem';
import FinishedTaskExport from './FinishedTasksExport';

export const FinishedTasks = (props) => (
    <div className="finished-tasks" >
        <FinishedTasksList {...props} />
    </div>
);

export const FinishedTasksList = (props) => {
    const {tasks} = props;
    if (tasks.length === 0) {
        return (<div className="finished-tasks__item">No finished tasks</div>);
    } else {
        return (
            <>
                <FinishedTaskListItems tasks={tasks} />
                <FinishedTaskExport tasks={tasks} />
            </>
        );
    }
}

export const FinishedTaskListItems = ({tasks}) => {
    return tasks.map( (task, index) => <FinishedTaskItem key={index} {...task}/>);
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.finished_tasks
    };
};

export default connect(mapStateToProps)(FinishedTasks);