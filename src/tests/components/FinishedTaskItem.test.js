import React from 'react';
import { shallow } from 'enzyme';
import { createFinishedTasksState } from '../fixtures/tasks';
import FinishedTaskItem from '../../components/FinishedTaskItem';

test('Should render FinishedTaskItem', () => {
    // Given
    const state = createFinishedTasksState();
    const finishedTask = state.finished_tasks[0];

    // When
    const wrapper = shallow(<FinishedTaskItem {...finishedTask} />);

    // Then
    expect(wrapper).toMatchSnapshot();
});
