import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const FinishedTaskItem = ( {id, title, description, start_date, end_date} ) => {
    const start_moment = moment(start_date);
    const end_moment = moment(end_date);
    const duration = `${end_moment.diff(start_moment, 'minutes')}m`;
    return (
        <Link className="finished-tasks__link" to={`/edit/${id}`}>
            <div className="finished-tasks__item">
                <div>{ title }</div>
                <div>{ description }</div>
                <div>
                    <span className="finished-tasks__display-start-end">{ start_moment.format('hh:mm:ss A') }</span>
                    <span className="finished-tasks__display-start-end">-</span>
                    <span className="finished-tasks__display-start-end">{ end_moment.format('hh:mm:ss A') }</span>
                    <span className="finished-tasks__display-start-end">-</span>
                    <span>{ duration }</span>
                </div>
            </div>
        </Link>
    );
}

export default FinishedTaskItem;