import React from 'react';
import { shallow } from 'enzyme';
import { FinishedTasks, FinishedTasksList, FinishedTaskListItems } from '../../components/FinishedTasks';
import { createFinishedTasksState } from '../fixtures/tasks';

const state = createFinishedTasksState();

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
    const tasks = state.finished_tasks;
    const wrapper = shallow(<FinishedTasksList tasks={tasks} />);
    expect(wrapper).toMatchSnapshot();
})

test('Should render FinishedTaskListItems', () => {
    const tasks = state.finished_tasks;
    const wrapper = shallow(<FinishedTaskListItems tasks={tasks} />);
    expect(wrapper).toMatchSnapshot();
})