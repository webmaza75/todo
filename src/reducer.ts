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
    actions: {
        addTask: (task: TaskItem) => {},
        undoDeleteTasks: (tasks: TaskItem[]) => {},
        deleteTasks: (tasksIds: number[]) => {},
    }
});

export const reducer = (state: IState, action) => {
    switch (action.type) {
        case ActionType.LOAD_LIST:
            return state.taskList;
        case ActionType.ADD_TASK:
            return addTask(action.payload, state);
        case ActionType.UNDO_DELETE_TASKS:
            return undoDeleteTasks(action.payload, state);
        case ActionType.DELETE_TASKS:
            return deleteTasks(action.payload, state);
        default:
            return state;
    }
};
