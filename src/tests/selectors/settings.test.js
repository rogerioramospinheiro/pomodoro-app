import { selectDisplayState, selectInitTime, selectDisplayColor } from '../../selectors/settings';

const dummy_time = {
    activity_time: 1000, 
    rest_time: 111
};

test('Should select state color time when counting', () => {
    const tasks = {
        state_name: 'COUNTING'
    };

    const time = selectInitTime(tasks, dummy_time);
    const state = selectDisplayState(tasks);
    const color = selectDisplayColor(tasks);

    expect(time).toBe(1000);
    expect(state).toBe('WORK');
    expect(color).toBe('red');
});

test('Should select state color time when resting', () => {
    const tasks = {
        state_name: 'RESTING'
    }

    const time = selectInitTime(tasks, dummy_time);
    const state = selectDisplayState(tasks);
    const color = selectDisplayColor(tasks);

    expect(time).toBe(111);
    expect(state).toBe('REST');
    expect(color).toBe('green');
});

test('Should select state color time when idle', () => {
    const tasks = {};

    const time = selectInitTime(tasks, dummy_time);
    const state = selectDisplayState(tasks);
    const color = selectDisplayColor(tasks);

    expect(time).toBe(0);
    expect(state).toBe('');
    expect(color).toBe('black');
});