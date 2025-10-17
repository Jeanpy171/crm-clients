import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TaskDTO } from "../../../modules/tasks/application/dtos/TaskDTO";
import { GetTasksUseCase } from "../../../modules/tasks/application/useCases/GetTasksUseCase";
import { TaskMockAdapter } from "../../../modules/tasks/infrastructure/adapters/TaskMockAdapter";

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

const repository = new TaskMockAdapter();

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
