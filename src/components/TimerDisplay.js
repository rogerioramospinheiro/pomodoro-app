import React from 'react';
import { connect } from 'react-redux';
import { calculateTimer } from '../helpers/timerdisplay_helper';
import { finishTask } from '../actions/tasks';
import { selectInitTime, selectDisplayColor } from '../selectors/settings';

export class TimerDisplay extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
        endtime: 0
    };
    onIntervalHandle = (ctx) => {

        let minutes = ctx.state.minutes;
        let seconds = ctx.state.seconds;
        let end_time = ctx.state.endtime;

        if (ctx.props.init_time > 0) {

            const timer = calculateTimer(end_time, ctx.props.init_time);
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
    setCounter = (minutes, seconds, endtime) => {
        this.setState( {minutes: minutes, seconds: seconds, endtime: endtime} );
    };
    displayCounter = () => {
        const m = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
        const s = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;
        return `${m}:${s}`;
    };
    finishCountdown = (end_time) => {
        const now = {
            end_date: end_time
        }
        this.props.finishTask(now);
    };
    componentDidMount() {
        this.intervalTimeout = setInterval(this.onIntervalHandle, 500, this);
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