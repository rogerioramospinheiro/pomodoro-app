import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startTask, cancelTask } from '../actions/tasks';

class TaskForm extends React.Component {
    state = {
        task_title: '',
        task_description: '',
    };
    onDescriptionChangeHandle = (e) => {
        const description = e.target.value;
        this.setState( {task_description: description} );
    };
    onTitleChangeHandle = (e) => {
        const title = e.target.value;
        this.setState( {task_title: title} );
    };
    toggleButtonName = () => {
        return this.isIdle() ? 'Start' : 'Stop';
    };
    onSubmitHandle = (e) => {
        e.preventDefault();
        if (this.isIdle()) {
            this.props.startTask({
                title: this.state.task_title, 
                description: this.state.task_description, 
                start_date: moment().valueOf(), 
            })
        } else {
            this.props.cancelTask();
        }
    };
    isIdle = () => {
        return this.props.state_name === 'IDLE';
    };
    isNotIdle = () => {
        return this.props.state_name !== 'IDLE';
    }
    render() {
        return (
            <div className="task-form">
                <form onSubmit={this.onSubmitHandle}>
                    <div className="task-form__45area">
                        <input 
                        type="text"
                        className="task-form__input"
                        placeholder="Task Title"
                        autoFocus
                        value={this.state.task_title}
                        onChange={this.onTitleChangeHandle}
                        disabled={this.isNotIdle()}
                        />
                    </div>
                    <div className="task-form__45area">
                        <input 
                        type="text"
                        className="task-form__input"
                        placeholder="Task Description"
                        value={this.state.task_description}
                        onChange={this.onDescriptionChangeHandle}
                        disabled={this.isNotIdle()}
                        />
                    </div>
                    <div className="task-form__10area">
                        <button className="task-form__button">{ this.toggleButtonName() }</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state_name: state.tasks.state_name
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startTask: (task) => dispatch(startTask(task)),
        cancelTask: () => dispatch(cancelTask())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);