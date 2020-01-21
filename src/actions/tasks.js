export const startTask = ({title = '', description = '', start_date = 0} = {}) => ({
    type: 'START_TASK',
    task: {
        title,
        description,
        start_date
    }
});

export const cancelTask = () => ({
    type: 'CANCEL_TASK'
});

export const finishTask = ({end_date = 0} = {}) => ({
    type: 'FINISH_TASK',
    task: {
        end_date
    }
});

export const editFinishedTask = (id, updates) => ({
    type: 'EDIT_FINISHED_TASK',
    id,
    updates
})

export const terminateTask = ({end_date = 0} = {}) => ({
    type: 'TERMINATE_TASK',
    task: {
        end_date
    }
});