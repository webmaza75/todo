import { TaskItem } from "../../types";

export const addTask = (task: TaskItem, state) => {
    return {
        ...state,
        taskList: [
            ...state.taskList,
            task
        ],
    };
};

export const editTask = (task: TaskItem, state) => {
    const {taskList} = state;
    const newTaskList = [...taskList];
    const taskIndex = taskList.findIndex(({id}) => id === task.id)
    newTaskList[taskIndex] = task;

    return {
        ...state,
        taskList: newTaskList,
    };
};

export const loadTasks = (tasks: TaskItem[], state) => {
    return {
        ...state,
        taskList: tasks
    };
};

export const undoDeleteTasks = (deletedTasks: TaskItem[], state) => {
    return {
        ...state,
        taskList: [...state.taskList, ...deletedTasks]
    }
};

export const deleteTasks = (deletedTasksIds: number[], state) => {
    return {
        ...state,
        taskList: [...state.taskList.filter(({id}) => !deletedTasksIds.includes(id))]
    }
}
