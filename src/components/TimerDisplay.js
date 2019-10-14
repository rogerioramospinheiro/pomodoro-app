import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { finishTask } from '../actions/tasks';
import { selectInitTime, selectDisplayColor } from '../selectors/settings';

class TimerDisplay extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
    };
    onIntervalHandle = (ctx) => {

        const timer = ctx.currentCounter();

        if (timer) {

            let minutes = timer.minutes;
            let seconds = timer.seconds;
            
            if (minutes > 0 && seconds === 0) {
                minutes = minutes - 1;
                seconds = 59;
            } else {
                seconds = seconds - 1;
            }
    
            if ( minutes === 0 && seconds === 0) {
                ctx.finishCountdown();
            }
            
            ctx.setCounter(minutes, seconds);
        }
    };
    setCounter = (minutes, seconds) => {
        this.setState( {minutes: minutes, seconds: seconds} );
    };
    displayCounter = () => {
        const m = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
        const s = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;
        return `${m}:${s}`;
    };
    currentCounter = () => {

        const minutes = this.state.minutes;
        const seconds = this.state.seconds;

        if (this.props.init_time > 0) {

            if (minutes > 0 || seconds > 0) {
                return {
                    minutes: minutes,
                    seconds: seconds
                }
            } else {
                return {
                    minutes: this.props.init_time,
                    seconds: 0
                }
            }

        } else {

            if (minutes > 0 || seconds > 0) {
                this.setCounter(0, 0);
            }

            return undefined;
        }
    };
    finishCountdown = () => {
        const now = {
            end_date: moment().valueOf()
        }
        this.props.finishTask(now);
    };
    componentDidMount() {
        this.intervalTimeout = setInterval(this.onIntervalHandle, 1000, this);
    }
    componentWillUnmount() {
        clearInterval(this.intervalTimeout);
    }
    render() {
        return (
            <div className="timer-display">
                <div className="timer-display__text" style={{color: this.props.display_color}}>{ this.displayCounter() }</div>
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