import * as React from 'react';
import {TaskItem} from './types';
import {ActionType} from './components/actions/action-types';
import {addTask, undoDeleteTasks, deleteTasks} from './components/actions/actions';

/**
 * @prop {TaskItem[]} taskList Все имеющиеся задачи.
 */
interface IState {
    taskList: TaskItem[];
}

const initialState = {
    taskList: [],
};

export const ContextApp = React.createContext({
    ...initialState,
    addTask: (task: TaskItem) => {},
    undoDeleteTasks: (tasks: TaskItem[]) => {},
    deleteTasks: (tasksIds: number[]) => {},
});

export const reducer = (state: IState, action) => {
    const {LOAD_LIST, ADD_TASK, UNDO_DELETE_TASKS, DELETE_TASKS} = ActionType;

    switch (action.type) {
        case LOAD_LIST:
            return state.taskList;
        case ADD_TASK:
            return addTask(action.payload, state);
        case UNDO_DELETE_TASKS:
            return undoDeleteTasks(action.payload, state);
        case DELETE_TASKS:
            return deleteTasks(action.payload, state);
        default:
            return state;
    }
};
