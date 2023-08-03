import React from 'react';
import { connect } from 'react-redux';
import { calculateTimer } from '../helpers/timerdisplay_helper';
import { finishTask } from '../actions/tasks';
import { selectInitTime, selectDisplayColor, selectDisplayState } from '../selectors/settings';

export const updateTimer = (ctx, calculate) => {

    let minutes = ctx.state.minutes;
    let seconds = ctx.state.seconds;
    let end_time = ctx.state.endtime;

    if (ctx.props.init_time > 0) {

        const timer = calculate(end_time, ctx.props.init_time);
        const updated_end_time = (timer.is_counting) ? timer.end_time : 0;

        ctx.setTitle(timer.minutes, timer.seconds, updated_end_time);
        ctx.setCounter(timer.minutes, timer.seconds, updated_end_time);

        if (timer.is_finished) {
            ctx.finishCountdown(end_time);
        }

    } else {

        if (minutes > 0 || seconds > 0) {
            ctx.setTitle(0, 0, 0);
            ctx.setCounter(0, 0, 0);
        }
    }
};

export const printCounter = (ctx) => {
    const m = ctx.state.minutes < 10 ? `0${ctx.state.minutes}` : ctx.state.minutes;
    const s = ctx.state.seconds < 10 ? `0${ctx.state.seconds}` : ctx.state.seconds;
    return `${m}:${s}`;
};

export const updateTitle = (ctx, minutes, seconds, endtime) => {
    if (minutes === 0 && seconds === 0 && endtime === 0) {
        ctx.setDocumentTitle(ctx.pagetitle);
    } else if (minutes > 0 && minutes !== ctx.state.minutes) {
        ctx.setDocumentTitle('[' + ctx.props.display_state + ' ' + minutes + ' min] ' + ctx.pagetitle);
    } else if (seconds > 0 && minutes !== ctx.state.minutes) {
        ctx.setDocumentTitle('[' + ctx.props.display_state + ' ' + ' < 1 min] ' + ctx.pagetitle); 
    }
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
    setTitle = (minutes, seconds, endtime) => {
        updateTitle(this, minutes, seconds, endtime);
    };
    setDocumentTitle = (documentTitle) => {
        document.title = documentTitle;
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
        this.pagetitle = document.title;
        this.intervalTimeout = setInterval(this.onIntervalHandle, 250, this);
    };
    componentWillUnmount() {
        document.title = this.pagetitle;
        clearInterval(this.intervalTimeout);
    };
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
        display_color: selectDisplayColor(state.tasks),
        display_state: selectDisplayState(state.tasks)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        finishTask: (end_date) => dispatch(finishTask(end_date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerDisplay);