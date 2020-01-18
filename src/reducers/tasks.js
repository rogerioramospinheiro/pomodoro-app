import uuidv1 from 'uuid/v1';

const tasksReducerDefaultState = {
    state_name: 'IDLE',
    current_task: {
    },
    finished_tasks: []
};

const transitionStartToCounting = (state, action) => {
    if (state.state_name === 'IDLE') {
        return {
            state_name: 'COUNTING',
            current_task: {
                title: action.task.title,
                description: action.task.description,
                start_date: action.task.start_date,
            },
            finished_tasks: [...state.finished_tasks]
        };
    } else {
        return state;
    }
};

const transitionCancelToIdle = (state) => {
    if (state.state_name !== 'IDLE') {
        return {
            state_name: 'IDLE',
            current_task: tasksReducerDefaultState.current_task,
            finished_tasks: [...state.finished_tasks]
        }
    } else {
        return state;
    }
};

const transitionFinishToIdle = (state, action) => {
    if (state.state_name === 'COUNTING') {
        return {
            state_name: 'RESTING',
            current_task: {
                title: state.current_task.title,
                description: state.current_task.description,
                start_date: state.current_task.start_date,
            },
            finished_tasks: [
                ...state.finished_tasks
            ]
        }
    } else if (state.state_name === 'RESTING') {
        const finished_task = {
            id: uuidv1(),
            title: state.current_task.title,
            description: state.current_task.description,
            start_date: state.current_task.start_date,
            end_date: action.task.end_date
        };
        return {
            state_name: 'IDLE',
            current_task: tasksReducerDefaultState.current_task,
            finished_tasks: [
                finished_task,
                ...state.finished_tasks
            ]
        }
    } else {
        return state;
    }
}

const completeEditFinishedTask = (state, action) => {
    const finished_tasks = state.finished_tasks.map( (task) => {
        if (task.id === action.id) {
            return {
                ...task,
                ...action.updates
            };
        } else {
            return task;
        }
    });
    return {
        ...state,
        finished_tasks
    };
}

export default (state = tasksReducerDefaultState, action) => {
    switch(action.type) {
        case 'START_TASK':
            return transitionStartToCounting(state, action);
        case 'CANCEL_TASK':
            return transitionCancelToIdle(state);
        case 'FINISH_TASK':
            return transitionFinishToIdle(state, action);
        case 'EDIT_FINISHED_TASK':
            return completeEditFinishedTask(state, action);
        default:
            return state;
    }
};