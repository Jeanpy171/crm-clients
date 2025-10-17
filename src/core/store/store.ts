import { configureStore } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import authReducer from "../store/slices/auth";
import taskReducer from "../store/slices/tasks";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
