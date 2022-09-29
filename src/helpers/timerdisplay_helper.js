import moment from 'moment';

const SEC = 1000;
const MIN = 60 * SEC;

export const calculateTimer = (end_time, init_minutes) => {
    const time = moment();
    const this_time = time.valueOf();
    let updated_end_time = end_time;

    if (end_time === 0) {
        time.add(init_minutes, 'minutes');
        updated_end_time = time.valueOf();
    } 

    const milliseconds = updated_end_time - this_time;
    const res_seconds = milliseconds % MIN;
    const res_millis = res_seconds % SEC;
    const minutes = (milliseconds > MIN) ? (milliseconds - res_seconds) / MIN : 0;
    const seconds = (res_seconds > SEC) ? (res_seconds - res_millis) / SEC : 0;
    const is_counting = milliseconds > SEC;
    const is_finished = !is_counting;
    

    return {
        this_time,
        end_time: updated_end_time,
        minutes,
        seconds,
        is_finished,
        is_counting
    }
};