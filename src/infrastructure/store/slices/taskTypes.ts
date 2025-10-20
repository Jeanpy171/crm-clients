import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface TaskTypeState {
  taskTypes: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskTypeState = {
  taskTypes: [],
  isLoading: false,
  error: null,
};

const getTaskTypeRepository = container.getTaskTypeCatalog;

export const getTaskTypeCatalog = createAsyncThunk(
  "taskTypes/getTaskTypeCatalog",
  async () => {
    return await getTaskTypeRepository.execute();
  }
);

const taskSlice = createSlice({
  name: "taskTypes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTaskTypeCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getTaskTypeCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.taskTypes = action.payload;
      }
    );
    builder.addCase(getTaskTypeCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all task type catalog";
      state.isLoading = false;
    });
  },
});

export default taskSlice.reducer;
