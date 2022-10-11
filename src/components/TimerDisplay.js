import React from 'react';
import { connect } from 'react-redux';
import { calculateTimer } from '../helpers/timerdisplay_helper';
import { finishTask } from '../actions/tasks';
import { selectInitTime, selectDisplayColor } from '../selectors/settings';

export const updateTimer = (ctx, calculate) => {

    let minutes = ctx.state.minutes;
    let seconds = ctx.state.seconds;
    let end_time = ctx.state.endtime;

    if (ctx.props.init_time > 0) {

        const timer = calculate(end_time, ctx.props.init_time);
        const updated_end_time = (timer.is_counting) ? timer.end_time : 0;

        ctx.setCounter(timer.minutes, timer.seconds, updated_end_time);

        if (timer.is_finished) {
            ctx.finishCountdown(end_time);
        }

    } else {

        if (minutes > 0 || seconds > 0) {
            ctx.setCounter(0, 0, 0);
        }
    }
};

export const printCounter = (ctx) => {
    const m = ctx.state.minutes < 10 ? `0${ctx.state.minutes}` : ctx.state.minutes;
    const s = ctx.state.seconds < 10 ? `0${ctx.state.seconds}` : ctx.state.seconds;
    return `${m}:${s}`;
};

export class TimerDisplay extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
        endtime: 0
    };
    onIntervalHandle = (ctx) => {
        updateTimer(ctx, calculateTimer);
    };
    setCounter = (minutes, seconds, endtime) => {
        this.setState( {minutes: minutes, seconds: seconds, endtime: endtime} );
    };
    displayCounter = () => {
        return printCounter(this);
    };
    finishCountdown = (end_time) => {
        const now = {
            end_date: end_time
        }
        this.props.finishTask(now);
    };
    componentDidMount() {
        this.intervalTimeout = setInterval(this.onIntervalHandle, 250, this);
    }
    componentWillUnmount() {
        clearInterval(this.intervalTimeout);
    }
    render() {
        return (
            <div className="timer-display">
                <div className="timer-display__text" style={{color: this.props.display_color}}>{this.displayCounter()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        init_time: selectInitTime(state.tasks, state.settings),
        display_color: selectDisplayColor(state.tasks)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        finishTask: (end_date) => dispatch(finishTask(end_date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerDisplay);