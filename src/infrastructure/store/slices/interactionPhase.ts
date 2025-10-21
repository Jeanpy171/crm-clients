import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface InteractionPhaseState {
  interactionPhases: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InteractionPhaseState = {
  interactionPhases: [],
  isLoading: false,
  error: null,
};

const getInteractionPhaseRepository = container.getInteractionPhaseUseCase;

export const getInteractionPhaseCatalog = createAsyncThunk(
  "interactionPhase/getInteractionPhaseCatalog",
  async () => {
    return await getInteractionPhaseRepository.execute();
  }
);

const interactionPhaseSlice = createSlice({
  name: "interactionPhase",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getInteractionPhaseCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getInteractionPhaseCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.interactionPhases = action.payload;
      }
    );
    builder.addCase(getInteractionPhaseCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all interactionPhase catalog";
      state.isLoading = false;
    });
  },
});

export default interactionPhaseSlice.reducer;
