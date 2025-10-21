import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface InterestLevelState {
  interestLevels: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InterestLevelState = {
  interestLevels: [],
  isLoading: false,
  error: null,
};

const getInterestLevelRepository = container.getInterestLevelUseCase;

export const getInterestLevelCatalog = createAsyncThunk(
  "interestLevel/getInterestLevelCatalog",
  async () => {
    return await getInterestLevelRepository.execute();
  }
);

const interestLevelSlice = createSlice({
  name: "interestLevel",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getInterestLevelCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getInterestLevelCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.interestLevels = action.payload;
      }
    );
    builder.addCase(getInterestLevelCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all interest level catalog";
      state.isLoading = false;
    });
  },
});

export default interestLevelSlice.reducer;
