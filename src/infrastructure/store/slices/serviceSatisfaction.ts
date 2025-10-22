import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface ServiceSatisfactionState {
  serviceSatisfactions: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceSatisfactionState = {
  serviceSatisfactions: [],
  isLoading: false,
  error: null,
};

const getServiceSatisfactionRepository = container.getServiceSatisfactionUseCase;

export const getServiceSatisfactionCatalog = createAsyncThunk(
  "serviceSatisfaction/getServiceSatisfactionCatalog",
  async () => {
    return await getServiceSatisfactionRepository.execute();
  }
);

const serviceSatisfactionSlice = createSlice({
  name: "serviceSatisfaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getServiceSatisfactionCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getServiceSatisfactionCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.serviceSatisfactions = action.payload;
      }
    );
    builder.addCase(getServiceSatisfactionCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all service satisfaction catalog";
      state.isLoading = false;
    });
  },
});

export default serviceSatisfactionSlice.reducer;
