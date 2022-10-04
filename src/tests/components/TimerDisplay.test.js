import React from 'react';
import { shallow } from 'enzyme';
import { TimerDisplay, updateTimer } from '../../components/TimerDisplay';

test('Should render TimerDisplay', () => {
    // Given
    const display_color ='black';
    const wrapper = shallow(<TimerDisplay display_color={display_color}/>);
    // Then
    expect(wrapper).toMatchSnapshot();
});

test('Should update timer when user canceled timer', () => {
    // Given
    const setCounter = jest.fn();
    const ctx = {
        state: {
            minutes: 0,
            seconds: 30,
            endTime: 0
        },
        props: {
            init_time: 0
        },
        setCounter
    };
    const calculate = jest.fn();
    // When
    updateTimer(ctx, calculate);
    // Then
    expect(setCounter.mock.calls.length).toBe(1);
    expect(setCounter.mock.calls[0][0]).toBe(0);
    expect(setCounter.mock.calls[0][1]).toBe(0);
    expect(setCounter.mock.calls[0][2]).toBe(0);
});