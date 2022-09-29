import React from 'react';
import { shallow } from 'enzyme';
import { TimerDisplay } from '../../components/TimerDisplay';

test('Should render TimerDisplay', () => {
    // Given
    const display_color ='black';
    const wrapper = shallow(<TimerDisplay display_color={display_color}/>);
    // Then
    expect(wrapper).toMatchSnapshot();
});