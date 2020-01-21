import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startTask, cancelTask, terminateTask } from '../actions/tasks';

export class TaskForm extends React.Component {
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
        return this.isIdle() ? 'Start' : 'Cancel';
    };
    onSubmitHandle = (e) => {
        e.preventDefault();
        if (this.isIdle()) {
            const { 
                task_title, 
                task_description 
            } = this.state;
            if (task_title && task_description) {
                this.props.startTask({
                    title: task_title, 
                    description: task_description, 
                    start_date: moment().valueOf(), 
                });
            }
        } else {
            this.props.cancelTask();
        }
    };
    onFinishHandle = (e) => {
        e.preventDefault();
        const now = {
            end_date: moment().valueOf()
        };
        this.props.terminateTask(now);
    };
    isIdle = () => {
        return this.props.state_name === 'IDLE';
    };
    isNotIdle = () => {
        return this.props.state_name !== 'IDLE';
    };
    renderStartButton = () => {
        return (
            <button className="task-form__save">{ this.toggleButtonName() }</button>
        );
    };
    renderCancelFinishButton = () => {
        return (
            <div className="task-form__button-group">
                <button className="task-form__button">{ this.toggleButtonName() }</button>
                <button className="task-form__button" onClick={this.onFinishHandle}>Finish</button>
            </div>
        );
    };
    render() {
        return (
            <div className="task-form">
                <form onSubmit={this.onSubmitHandle}>
                    <div className="task-form__spacebox">
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
                    <div className="task-form__spacebox">
                        <textarea 
                        type="text"
                        className="task-form__textarea"
                        placeholder="Task Description"
                        value={this.state.task_description}
                        onChange={this.onDescriptionChangeHandle}
                        disabled={this.isNotIdle()}
                        />
                    </div>
                    {
                        this.isIdle() ? this.renderStartButton() : this.renderCancelFinishButton()
                    }
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
        cancelTask: () => dispatch(cancelTask()),
        terminateTask: (end_date) => dispatch(terminateTask(end_date))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);