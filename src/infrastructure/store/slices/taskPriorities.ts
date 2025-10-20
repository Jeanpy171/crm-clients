import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface TaskPriorityState {
  taskPriorities: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskPriorityState = {
  taskPriorities: [],
  isLoading: false,
  error: null,
};

const getTaskPriorityRepository = container.getTaskPriorityCatalog;

export const getTasksPriorityCatalog = createAsyncThunk(
  "taskPriorities/getTasksPriorityCatalog",
  async () => {
    return await getTaskPriorityRepository.execute();
  }
);

const taskSlice = createSlice({
  name: "taskPriorities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasksPriorityCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getTasksPriorityCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.taskPriorities = action.payload;
      }
    );
    builder.addCase(getTasksPriorityCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all task priority catalog";
      state.isLoading = false;
    });
  },
});

export default taskSlice.reducer;
