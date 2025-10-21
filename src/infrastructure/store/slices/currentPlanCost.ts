import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface CurrentPlanCostState {
  currentPlanCosts: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentPlanCostState = {
  currentPlanCosts: [],
  isLoading: false,
  error: null,
};

const getCurrentPlanCostRepository = container.getCurrentPlanCostUseCase;

export const getCurrentPlanCostCatalog = createAsyncThunk(
  "currentPlanCost/getCurrentPlanCostCatalog",
  async () => {
    return await getCurrentPlanCostRepository.execute();
  }
);

const currentPlanCostSlice = createSlice({
  name: "currentPlanCost",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentPlanCostCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getCurrentPlanCostCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.currentPlanCosts = action.payload;
      }
    );
    builder.addCase(getCurrentPlanCostCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all current plan cost catalog";
      state.isLoading = false;
    });
  },
});

export default currentPlanCostSlice.reducer;
