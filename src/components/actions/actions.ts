import { TaskItem } from "../../types";

export const addTask = (task: TaskItem, state) => {
    return {
        ...state,
        tasks: [
            ...state.tasks,
            task
        ],
    };
};
