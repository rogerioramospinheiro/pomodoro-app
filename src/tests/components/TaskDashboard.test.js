import React from 'react';
import { shallow } from 'enzyme';
import TaskDashboard from '../../components/TaskDashboard';

test('Should render TaskDashboard', () => {
    // When
    const wrapper = shallow(<TaskDashboard />);
    // Then
    expect(wrapper).toMatchSnapshot();
})