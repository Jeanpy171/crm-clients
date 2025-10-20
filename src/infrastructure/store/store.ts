import { configureStore } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import authReducer from "../store/slices/auth";
import taskReducer from "../store/slices/tasks";
import taskPriorityReducer from "../store/slices/taskPriorities";
import taskTypeReducer from "../store/slices/taskTypes";
import taskStatusReducer from "../store/slices/taskStatus";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    taskPriorities: taskPriorityReducer,
    taskTypes: taskTypeReducer,
    taskStatus: taskStatusReducer,
  },
});
