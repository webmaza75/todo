import * as React from 'react';
import {TaskItem} from './types';
import taskList from './mocks/taskList';
import {ActionType} from './components/actions/action-types';
import {addTask} from './components/actions/actions';

export const ContextApp = React.createContext({
    tasks: taskList,
    addTask: (task: TaskItem) => {}
  });

export const reducer = (state, action) => {
    const {LOAD_LIST, ADD_TASK} = ActionType;

    switch (action.type) {
        case LOAD_LIST:
            return state.tasks;
        case ADD_TASK:
            return addTask(action.payload, state);
        default:
            return state;
    }
};
