import React from 'react';
import { shallow } from 'enzyme';
import { EditFinishedTaskItem } from '../../components/EditFinishedTaskItem';
import { createFinishedTasksState } from '../fixtures/tasks';

const defaultState = createFinishedTasksState();

const createEditFinishedTaskWrapper = () => {
    const selectedTask = defaultState.finished_tasks[0];
    const wrapper = shallow(<EditFinishedTaskItem selectedTask={selectedTask} />);
    return wrapper;
};

test('Should render EditFinishedTask', () => {
    // When
    const wrapper = createEditFinishedTaskWrapper();

    // Then
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onChangeTitle', () => {
    // Given
    const wrapper = createEditFinishedTaskWrapper();
    const value = 'JOB-1111';

    // When
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });

    // Then
    expect(wrapper.state('title')).toBe('JOB-1111');
});

test('Should handle onChangeDescription', () => {
    // Given
    const wrapper = createEditFinishedTaskWrapper();
    const value = 'Start working on this';

    // When 
    wrapper.find('textarea').simulate('change', {
        target: {
            value
        }
    })

    // Then
    expect(wrapper.state('description')).toBe('Start working on this');
})

test('Should handle onSubmitHandle', () => {
    // Given
    const selectedTask = {
        ...defaultState.finished_tasks[0],
        title: 'JOB-2222',
        description: 'Preparing loadout'
    };
    const push = jest.fn();
    const history = {push};
    const editFinishedTask = jest.fn();
    const wrapper = shallow(
        <EditFinishedTaskItem
        selectedTask={selectedTask} 
        history={history}
        editFinishedTask={editFinishedTask}
        />
    );

    // When
    wrapper.find('form').simulate('submit', {
        preventDefault: jest.fn()
    });

    // Then
    expect(editFinishedTask).toHaveBeenCalledWith(
        selectedTask.id, {
        title: 'JOB-2222',
        description: 'Preparing loadout'
    });
    expect(push).toHaveBeenCalledWith('/');
});