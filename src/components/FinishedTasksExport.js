import React from 'react';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const FinishedTasksExport = ({tasks}) => {
    const headers = ['ID', 'TITLE', 'DESCRIPTION', 'START TIME', 'END TIME', 'DURATION'];
    const csvData = [headers];
    tasks.forEach( (task) => {
        const start_moment = moment(task.start_date);
        const end_moment = moment(task.end_date);
        const row = [ 
            task.id, 
            task.title, 
            task.description, 
            start_moment.format('hh:mm:ss A'), 
            end_moment.format('hh:mm:ss A'),
            `${end_moment.diff(start_moment, 'minutes')}m`
        ]
        csvData.push(row);
    });
    const printDate = moment(tasks[0].start_date).format('YYYYMMDD');
    const fileName = `pomodoro-app-export-${printDate}.csv`
    return (
        <CSVLink data={csvData} filename={fileName} enclosingCharacter={`"`} className="finished-tasks__link">
            <div className="task-form__button finished-tasks__link-export button-wide">Export</div>
        </CSVLink>
    );
};

export default FinishedTasksExport;