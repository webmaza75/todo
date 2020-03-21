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
