import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface HousingSectorState {
  housingSectors: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HousingSectorState = {
  housingSectors: [],
  isLoading: false,
  error: null,
};

const getHousingSectorRepository = container.getHousingSectorUseCase;

export const getHousingSectorCatalog = createAsyncThunk(
  "housingSector/getHousingSectorCatalog",
  async () => {
    return await getHousingSectorRepository.execute();
  }
);

const housingSectorSlice = createSlice({
  name: "housingSector",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getHousingSectorCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getHousingSectorCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.housingSectors = action.payload;
      }
    );
    builder.addCase(getHousingSectorCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all housing sector catalog";
      state.isLoading = false;
    });
  },
});

export default housingSectorSlice.reducer;
