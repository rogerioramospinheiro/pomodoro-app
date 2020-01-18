export const createFinishedTasksState = () => {
    return {
        state_name: 'IDLE',
        current_task: {
        },
        finished_tasks: [
            {
                id: 'c638040c-3917-11ea-a137-2e728ce88125',
                title: 'TASK-0001',
                description: 'Job to be finished soon',
                start_date: 10000,
                end_date: 30000
            },
            {
                id: 'cf20da8a-3917-11ea-a137-2e728ce88125',
                title: 'TASK-0002',
                description: 'Job to finish by the end of the day',
                start_date: 40000,
                end_date: 60000
            },
            {
                id: 'd79e2000-3917-11ea-a137-2e728ce88125',
                title: 'TASK-0003',
                description: 'Job to be finished tomorrow',
                start_date: 70000,
                end_date: 100000
            },
        ]
    }
};