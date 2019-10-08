import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PomodoroApp from './components/PomodoroApp';
import configureStore from './store/configStore';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <PomodoroApp />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));