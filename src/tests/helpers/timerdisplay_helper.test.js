import { calculateTimer } from '../../helpers/timerdisplay_helper';

let date_now_fn = Date.now;

test('Should calculate init timer', () => {

    Date.now = jest.fn(() => new Date("2022-09-01T12:00:00.000Z"));
    const res = calculateTimer(0, 5);

    expect(res.minutes).toBe(5);
    expect(res.seconds).toBe(0);
    expect(res.is_counting).toBe(true);
    expect(res.is_finished).toBe(false);
});

test('Should calculate time left', () => {

    Date.now = jest.fn(() => new Date("2022-09-01T12:02:30.000Z"));
    const end_time = new Date("2022-09-01T12:00:00.000Z").getTime() + (5 * 60 * 1000);
    const res = calculateTimer(end_time, 5);

    expect(res.minutes).toBe(2);
    expect(res.seconds).toBe(30);
    expect(res.is_counting).toBe(true);
    expect(res.is_finished).toBe(false);
});

test('Should finish count down', () => {

    Date.now = jest.fn(() => new Date("2022-09-01T12:04:59.900Z"));
    const end_time = new Date("2022-09-01T12:00:00.000Z").getTime() + (5 * 60 * 1000);

    const res = calculateTimer(end_time, 5);

    expect(res.minutes).toBe(0);
    expect(res.seconds).toBe(0);
    expect(res.is_counting).toBe(false);
    expect(res.is_finished).toBe(true);
});

afterEach(() => {
    Date.now = date_now_fn;
})