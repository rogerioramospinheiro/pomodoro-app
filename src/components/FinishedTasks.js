import React from 'react';
import { connect } from 'react-redux';
import FinishedTaskItem from './FinishedTaskItem';

const tableStyle = {
    width: '800px'
};

const wrapperStyle = {
    width: '100%',
    boxSizing: 'border-box'
};

const colStyle = {
    width: '25%',
    display: 'inline-block',
    boxSizing: 'border-box'
};

const forEachTask = (task, index) => (
    <FinishedTaskItem 
    key={index} 
    {...task}
    />
);

const FinishedTasks = (props) => (
    <div style={tableStyle} >
        <div styles={wrapperStyle} >
            <div style={colStyle}>Title</div>
            <div style={colStyle}>Description</div>
            <div style={colStyle}>Start</div>
            <div style={colStyle}>End</div>
        </div>
        {
            props.tasks.length === 0 ? (<div style={wrapperStyle}>No finished tasks</div>) : props.tasks.map( forEachTask )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.finished_tasks
    };
};

export default connect(mapStateToProps)(FinishedTasks);