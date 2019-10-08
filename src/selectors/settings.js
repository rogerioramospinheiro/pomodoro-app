const idle_time = 0;

export const selectInitTime = (tasks, {activity_time, rest_time}) => {
    if (tasks.state_name === 'COUNTING') {
        return activity_time;
    } else if (tasks.state_name === 'RESTING') {
        return rest_time;
    } else {
        return idle_time;
    }
}

export const selectDisplayColor = (tasks) => {
    if (tasks.state_name === 'COUNTING') {
        return 'red';
    } else if (tasks.state_name === 'RESTING') {
        return 'green';
    } else {
        return 'black';
    }
};