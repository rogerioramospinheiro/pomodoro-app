import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const FinishedTaskItem = ( {id, title, description, start_date, end_date} ) => (
    <Link className="finished-tasks__link" to={`/edit/${id}`}>
        <div className="finished-tasks__item">
            <div>{ title }</div>
            <div>{ description }</div>
            <div>
                <span>{ moment(start_date).format('hh:mm:ss A') }</span>
                <span>-</span>
                <span>{ moment(end_date).format('hh:mm:ss A') }</span>
            </div>
        </div>
    </Link>
);

export default FinishedTaskItem;