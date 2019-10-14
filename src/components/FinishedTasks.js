import React from 'react';
import { connect } from 'react-redux';
import FinishedTaskItem from './FinishedTaskItem';

const forEachTask = (task, index) => (
    <FinishedTaskItem 
    key={index} 
    {...task}
    />
);

const FinishedTasks = (props) => (
    <div className="finished-tasks" >
        <div className="finished-tasks__headers">
            <div className="finished-tasks__column">Title</div>
            <div className="finished-tasks__column">Description</div>
            <div className="finished-tasks__column">Start</div>
            <div className="finished-tasks__column">End</div>
        </div>
        {
            props.tasks.length === 0 ? (<div className="finished-tasks__headers">No finished tasks</div>) : props.tasks.map( forEachTask )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.finished_tasks
    };
};

export default connect(mapStateToProps)(FinishedTasks);