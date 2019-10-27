import {startTask, cancelTask, finishTask} from '../../actions/tasks';

test('Should run start task action', () => {
    const task = {
        title: 'sample title', 
        description: 'sample description', 
        start_date: 2000
    };

    const action = startTask(task);

    expect(action).toEqual({
        type: 'START_TASK',
        task: task
    });
});

test('Should run start task action with no values', () => {
    const action = startTask();
    expect(action).toEqual({
        type: 'START_TASK',
        task: {
            title: '', 
            description: '', 
            start_date: 0
        }
    });
});

test('Should run cancel task', () => {
    const action = cancelTask();
    expect(action).toEqual({
        type: 'CANCEL_TASK'
    });
});

test('Should run finish task', () => {
    const task = {
        end_date: 1000
    }

    const action = finishTask(task);

    expect(action).toEqual({
        type: 'FINISH_TASK',
        task: task
    })
});

test('Should run finish task with default values', () => {
    const action = finishTask();
    expect(action).toEqual({
        type: 'FINISH_TASK',
        task: {
            end_date: 0
        }  
    })
});