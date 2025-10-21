import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface InterestInNewServiceState {
  interestInNewServices: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InterestInNewServiceState = {
  interestInNewServices: [],
  isLoading: false,
  error: null,
};

const getInterestInNewServiceRepository = container.getInterestInNewServiceUseCase;

export const getInterestInNewServiceCatalog = createAsyncThunk(
  "interestInNewService/getInterestInNewServiceCatalog",
  async () => {
    return await getInterestInNewServiceRepository.execute();
  }
);

const interestInNewServiceSlice = createSlice({
  name: "interestInNewService",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getInterestInNewServiceCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getInterestInNewServiceCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.interestInNewServices = action.payload;
      }
    );
    builder.addCase(getInterestInNewServiceCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all interest in new service catalog";
      state.isLoading = false;
    });
  },
});

export default interestInNewServiceSlice.reducer;
