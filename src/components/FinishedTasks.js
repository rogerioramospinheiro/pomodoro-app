import React from 'react';
import { connect } from 'react-redux';
import FinishedTaskItem from './FinishedTaskItem';

export const FinishedTasks = (props) => (
    <div className="finished-tasks" >
        <FinishedTasksList {...props} />
    </div>
);

export const FinishedTasksList = (props) => {
    if (props.tasks.length === 0) {
        return (<div className="finished-tasks__item">No finished tasks</div>);
    } else {
        return props.tasks.map( forEachTask )
    }
}

const forEachTask = (task, index) => (
    <FinishedTaskItem key={index} {...task}/>
);

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.finished_tasks
    };
};

export default connect(mapStateToProps)(FinishedTasks);