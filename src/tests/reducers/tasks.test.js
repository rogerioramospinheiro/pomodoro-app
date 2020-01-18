import tasksReducer from '../../reducers/tasks'
import { createFinishedTasksState } from '../fixtures/tasks';

test('Should edit finish task', () => {
    // Given
    const previousState = createFinishedTasksState();
    const finishedTask = previousState.finished_tasks[0];
    const action = {
        type: 'EDIT_FINISHED_TASK',
        id: finishedTask.id,
        updates: {
            title: 'JOB-0001',
            description: 'Wash boss car'
        }
    }

    // When
    const state = tasksReducer(previousState, action);

    // Then
    expect(state.finished_tasks[0]).toEqual({
        ...finishedTask,
        title: 'JOB-0001',
        description: 'Wash boss car'
    });
})