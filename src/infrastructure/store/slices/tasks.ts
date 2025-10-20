import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import { container } from "../../../config/di-container";
import { addToast } from "@heroui/react";

export interface TaskState {
  tasks: TaskDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const getTaskRepository = container.getTasksUseCase;
const saveTaskRepository = container.saveTaskUseCase;

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  return await getTaskRepository.execute();
});

export const saveTask = createAsyncThunk(
  "tasks/saveTask",
  async (task: TaskDTO) => {
    return await saveTaskRepository.execute(task);
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getTasks.fulfilled,
      (state, action: PayloadAction<TaskDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.tasks = action.payload;
      }
    );
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = action.error.message || "Error in get all tasks";
      state.isLoading = false;
    });

    builder.addCase(saveTask.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      saveTask.fulfilled,
      (state, action: PayloadAction<TaskDTO>) => {
        state.error = null;
        state.isLoading = false;
        state.tasks.push(action.payload);
      }
    );
    builder.addCase(saveTask.rejected, (state, action) => {
      state.error = action.error.message || "Error in save task";
      state.isLoading = false;
      addToast({
        title: "Error al guardar la tarea",
        description: action.error.message || "Error in save task",
        timeout: 2500,
      });
    });
  },
});

export default taskSlice.reducer;
