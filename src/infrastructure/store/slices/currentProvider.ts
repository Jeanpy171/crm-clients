import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface CurrentProviderState {
  currentProviders: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentProviderState = {
  currentProviders: [],
  isLoading: false,
  error: null,
};

const getCurrentProviderRepository = container.getCurrentProviderUseCase;

export const getCurrentProviderCatalog = createAsyncThunk(
  "currentProvider/getCurrentProviderCatalog",
  async () => {
    return await getCurrentProviderRepository.execute();
  }
);

const currentProviderSlice = createSlice({
  name: "currentProvider",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentProviderCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getCurrentProviderCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.currentProviders = action.payload;
      }
    );
    builder.addCase(getCurrentProviderCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all current provider catalog";
      state.isLoading = false;
    });
  },
});

export default currentProviderSlice.reducer;
