import React from 'react';
import { shallow } from 'enzyme';
import FinishedTasksExport from '../../components/FinishedTasksExport';
import { createFinishedTasksState } from '../fixtures/tasks';

test('Should render FinishedTasksExport', () => {
    const state = createFinishedTasksState();
    const tasks = state.finished_tasks;
    const wrapper = shallow(<FinishedTasksExport tasks={tasks} />);
    expect(wrapper).toMatchSnapshot();
});