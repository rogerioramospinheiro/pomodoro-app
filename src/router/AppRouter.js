import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import TaskDashboard from '../components/TaskDashboard';
import EditFinishedTaskItem from '../components/EditFinishedTaskItem';

const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={TaskDashboard} exact={true}/>
                <Route path="/edit/:id" component={EditFinishedTaskItem}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;