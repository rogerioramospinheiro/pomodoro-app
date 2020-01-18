import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const FinishedTaskItem = ( {id, title, description, start_date, end_date} ) => (
    <Link className="finished-tasks__link" to={`/edit/${id}`}>
        <div className="finished-tasks__headers">
            <div className="finished-tasks__column finished-tasks__content">{ title }</div>
            <div className="finished-tasks__column finished-tasks__content">{ description }</div>
            <div className="finished-tasks__column finished-tasks__content">{ moment(start_date).format('hh:mm:ss') }</div>
            <div className="finished-tasks__column finished-tasks__content">{ moment(end_date).format('hh:mm:ss') }</div>
        </div>
    </Link>
);

export default FinishedTaskItem;