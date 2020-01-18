import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editFinishedTask } from '../actions/tasks';

export class EditFinishedTaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.selectedTask.title,
            description: props.selectedTask.description
        };
    }
    onSubmitHandle = (e) => {
        e.preventDefault();
        const id = this.props.selectedTask.id;
        const updates = {
            title: this.state.title,
            description: this.state.description
        };
        this.props.editFinishedTask(id, updates);
        this.props.history.push('/');
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState( {title} );
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState( {description} );
    };
    render() {
        return (
            <div>
                <div className="timer-display">
                    <div className="timer-display__text">
                        <Link className="finished-tasks__link" to="/">Edit</Link>
                    </div>
                </div>
                <div className="task-form">
                    <form onSubmit={this.onSubmitHandle}>
                        <div className="task-form__spacebox">
                            <input type="text"
                            className="task-form__input"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.onTitleChange}/>
                        </div>
                        <div className="task-form__spacebox">
                            <textarea
                            className="task-form__textarea"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}/>
                        </div>
                        <button className="task-form__save">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        selectedTask: state.tasks.finished_tasks.find( (task) => task.id === props.match.params.id )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editFinishedTask: (id, updates) => dispatch(editFinishedTask(id, updates))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFinishedTaskItem);