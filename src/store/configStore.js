import { createStore, combineReducers } from 'redux';
import tasksReducer from '../reducers/tasks';
import settingsReducer from '../reducers/settings';

export default () => {
    const store = createStore(
        combineReducers({
            tasks: tasksReducer, 
            settings: settingsReducer
        }), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
};