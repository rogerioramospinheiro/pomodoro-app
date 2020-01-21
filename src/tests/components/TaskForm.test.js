import React from 'react';
import { shallow } from 'enzyme';
import { TaskForm } from '../../components/TaskForm';

jest.mock('moment', () => {
    return () => ({
        valueOf: function() {
            return 1000;
        }
    });
});

const createIdleTaskForm = () => {
    const state_name = 'IDLE';
    const wrapper = shallow(<TaskForm state_name={state_name} />);
    return wrapper;
};

const createIdleTaskFormAndRunSubmit = ({task_title = '', task_description = ''} = {}) => {
    // Given
    const state_name = 'IDLE';
    const startTask = jest.fn();
    const wrapper = shallow(<TaskForm state_name={state_name} startTask={startTask}/>);
    wrapper.setState({
        task_title, 
        task_description
    });

    // When
    wrapper.find('form').simulate('submit', {
        preventDefault: jest.fn()
    });

    return startTask;
};

test('Should render TaskForm in idle state', () => {
    // Given
    const wrapper = createIdleTaskForm();
    // Then
    expect(wrapper).toMatchSnapshot();
});

test('Should render TaskForm in counting state', () => {
    // Given
    const state_name = 'COUNTING';
    const wrapper = shallow(<TaskForm state_name={state_name} />);
    wrapper.setState({
        task_title: 'JOB-0005', 
        task_description: 'Counting...'
    });

    // Then
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onDescriptionChangeHandle', () => {
    // Given
    const wrapper = createIdleTaskForm();
    const value = 'JOB-0001';
    // When
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });
    // Then
    expect(wrapper.state('task_title')).toBe('JOB-0001');
});

test('Should handle onTitleChangeHandle', () => {
    // Given
    const wrapper = createIdleTaskForm();
    const value = 'First step to finish the job';
    // When
    wrapper.find('textarea').simulate('change', {
        target: {
            value
        }
    });
    // Then
    expect(wrapper.state('task_description')).toBe('First step to finish the job');
});

test('Should handle onSubmit and startTask', () => {
    // Given
    const startTask = createIdleTaskFormAndRunSubmit({
        task_title: 'JOB-0001',
        task_description: 'Second attempt to finish the job'
    });

    // Then
    expect(startTask.mock.calls.length).toBe(1);
    expect(startTask.mock.calls[0][0]).toEqual({
        title: 'JOB-0001',
        description: 'Second attempt to finish the job',
        start_date: 1000
    });
});

test('Should handle onSubmit and not startTask missing description', () => {
    // Given
    const startTask = createIdleTaskFormAndRunSubmit({
        task_title: 'JOB-0001'
    });

    // Then
    expect(startTask.mock.calls.length).toBe(0);
});

test('Should handle onSubmit and not startTask missing title', () => {
    // Given
    const startTask = createIdleTaskFormAndRunSubmit({
        description: 'Second attempt to finish the job'
    });

    // Then
    expect(startTask.mock.calls.length).toBe(0);
});

test('Should handle onSubmit and not startTask missing title and description', () => {
    // Given
    const startTask = createIdleTaskFormAndRunSubmit();

    // Then
    expect(startTask.mock.calls.length).toBe(0);
});

test('Should handle onSubmit and cancelTask', () => {
    // Given
    const state_name = 'COUNTING';
    const cancelTask = jest.fn();
    const wrapper = shallow(<TaskForm state_name={state_name} cancelTask={cancelTask}/>);
    wrapper.setState({
        task_title: 'JOB-0003', 
        task_description: 'Canceling...'
    });

    // When
    wrapper.find('form').simulate('submit', {
        preventDefault: jest.fn()
    });

    // Then
    expect(cancelTask.mock.calls.length).toBe(1);
});

test('Should handle onFinishHandle', () => {
    // Given
    const state_name = 'COUNTING';
    const terminateTask = jest.fn();
    const wrapper = shallow(<TaskForm state_name={state_name} terminateTask={terminateTask}/>);
    wrapper.setState({
        task_title: 'JOB-0004', 
        task_description: 'Terminating...'
    });

    // When
    wrapper.find('button').at(1).simulate('click', {
        preventDefault: jest.fn()
    });

    // Then
    expect(terminateTask.mock.calls[0][0]).toEqual({
        end_date: 1000
    });
});