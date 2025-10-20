import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface TaskStatusState {
  taskStatus: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskStatusState = {
  taskStatus: [],
  isLoading: false,
  error: null,
};

const getTaskStatusRepository = container.getTaskStatusCatalog;

export const getTaskStatusCatalog = createAsyncThunk(
  "taskStatus/getTasksStatusCatalog",
  async () => {
    return await getTaskStatusRepository.execute();
  }
);

const taskSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTaskStatusCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getTaskStatusCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.taskStatus = action.payload;
      }
    );
    builder.addCase(getTaskStatusCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all task status catalog";
      state.isLoading = false;
    });
  },
});

export default taskSlice.reducer;
