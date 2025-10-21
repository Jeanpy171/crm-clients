import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export interface ContactStatusState {
  contactStatus: CatalogDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactStatusState = {
  contactStatus: [],
  isLoading: false,
  error: null,
};

const getContactStatusRepository = container.getContactStatusUseCase;

export const getContactStatusCatalog = createAsyncThunk(
  "contactStatus/getContactStatusCatalog",
  async () => {
    return await getContactStatusRepository.execute();
  }
);

const contactStatusSlice = createSlice({
  name: "contactStatus",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getContactStatusCatalog.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getContactStatusCatalog.fulfilled,
      (state, action: PayloadAction<CatalogDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.contactStatus = action.payload;
      }
    );
    builder.addCase(getContactStatusCatalog.rejected, (state, action) => {
      state.error =
        action.error.message || "Error in get all contact status catalog";
      state.isLoading = false;
    });
  },
});

export default contactStatusSlice.reducer;
