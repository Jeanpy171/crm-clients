import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface ServiceDurationState {
  serviceDurations: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceDurationState = {
  serviceDurations: [],
  isLoading: false,
  error: null,
};

const getServiceDurationRepository = container.getServiceDurationUseCase;

export const getServiceDurationCatalog = createAsyncThunk(
  "serviceDuration/getServiceDurationCatalog",
  async () => {
    return await getServiceDurationRepository.execute();
  }
);

const serviceDurationSlice = createSlice({
  name: "serviceDuration",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getServiceDurationCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getServiceDurationCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.serviceDurations = action.payload;
      }
    );
    builder.addCase(getServiceDurationCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all service duration catalog";
      state.isLoading = false;
    });
  },
});

export default serviceDurationSlice.reducer;
