export const startTask = ({title, description, start_date, activity_time, rest_time} = {}) => ({
    type: 'START_TASK',
    task: {
        title,
        description,
        start_date,
        activity_time,
        rest_time
    }
});

export const cancelTask = () => ({
    type: 'CANCEL_TASK'
});

export const finishTask = ({end_date} = {}) => ({
    type: 'FINISH_TASK',
    task: {
        end_date
    }
});