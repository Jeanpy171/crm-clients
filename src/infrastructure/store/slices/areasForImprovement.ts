import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface AreasForImprovementState {
  areasForImprovement: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AreasForImprovementState = {
  areasForImprovement: [],
  isLoading: false,
  error: null,
};

const getAreasForImprovementRepository = container.getAreasForImprovementUseCase;

export const getAreasForImprovementCatalog = createAsyncThunk(
  "areasForImprovement/getAreasForImprovementCatalog",
  async () => {
    return await getAreasForImprovementRepository.execute();
  }
);

const areasForImprovementSlice = createSlice({
  name: "areasForImprovement",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAreasForImprovementCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getAreasForImprovementCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.areasForImprovement = action.payload;
      }
    );
    builder.addCase(getAreasForImprovementCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all areas for improvement catalog";
      state.isLoading = false;
    });
  },
});

export default areasForImprovementSlice.reducer;
