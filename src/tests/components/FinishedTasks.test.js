import React from 'react';
import { shallow } from 'enzyme';
import { FinishedTasks, FinishedTasksList } from '../../components/FinishedTasks';
import { createFinishedTasksState } from '../fixtures/tasks';

test('Should render FinishedTasks', () => {
    const wrapper = shallow(<FinishedTasks />);
    expect(wrapper).toMatchSnapshot();
})

test('Should render empty FinishedTaskList', () => {
    const tasks = [];
    const wrapper = shallow(<FinishedTasksList tasks={tasks} />);
    expect(wrapper).toMatchSnapshot();
})

test('Should render FinishedTaskList', () => {
    const state = createFinishedTasksState();
    const tasks = state.finished_tasks;
    const wrapper = shallow(<FinishedTasksList tasks={tasks} />);
    expect(wrapper).toMatchSnapshot();
})