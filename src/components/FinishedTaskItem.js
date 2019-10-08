import React from 'react';
import moment from 'moment';

const wrapperStyle = {
    width: '100%',
    boxSizing: 'border-box'
};

const colStyle = {
    width: '25%',
    display: 'inline-block',
    boxSizing: 'border-box'
};

const FinishedTaskItem = ( {title, description, start_date, end_date} ) => (
    <div style={wrapperStyle}>
        <div style={colStyle}>{ title }</div>
        <div style={colStyle}>{ description }</div>
        <div style={colStyle}>{ moment(start_date).format('hh:mm:ss') }</div>
        <div style={colStyle}>{ moment(end_date).format('hh:mm:ss') }</div>
    </div>
);

export default FinishedTaskItem;