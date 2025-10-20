import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import { GetTasksUseCase } from "../../../core/application/use-cases/tasks/GetTaskUseCase";
import { MockTaskRepository } from "../../mock/repositories/MockTaskRepository";

export interface TaskState {
  tasks: TaskDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const repository = new MockTaskRepository();

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  return await new GetTasksUseCase(repository).execute();
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.pending, (state) => {
      (state.error = null), (state.loading = true);
    });
    builder.addCase(
      getTasks.fulfilled,
      (state, action: PayloadAction<TaskDTO[]>) => {
        state.error = null;
        state.loading = false;
        state.tasks = action.payload;
      }
    );

    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = action.error.message || "Error in get all tasks";
      state.loading = false;
    });
  },
});

export default taskSlice.reducer;
