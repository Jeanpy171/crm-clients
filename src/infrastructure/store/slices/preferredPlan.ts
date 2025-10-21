import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface PreferredPlanState {
  preferredPlans: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PreferredPlanState = {
  preferredPlans: [],
  isLoading: false,
  error: null,
};

const getPreferredPlanRepository = container.getPreferredPlanUseCase;

export const getPreferredPlanCatalog = createAsyncThunk(
  "preferredPlan/getPreferredPlanCatalog",
  async () => {
    return await getPreferredPlanRepository.execute();
  }
);

const preferredPlanSlice = createSlice({
  name: "preferredPlan",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPreferredPlanCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getPreferredPlanCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.preferredPlans = action.payload;
      }
    );
    builder.addCase(getPreferredPlanCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all preferred plan catalog";
      state.isLoading = false;
    });
  },
});

export default preferredPlanSlice.reducer;
