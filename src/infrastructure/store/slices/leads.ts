import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import { addToast } from "@heroui/react";
import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import type { LeadDTO } from "../../../core/application/dtos/leads/LeadDTO";
import type { FilterLeadsParams } from "../../../core/domain/repositories/ILeadRepository";

export interface LeadState {
  leads: ClientDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  isLoading: false,
  error: null,
};

const getLeadsRepository = container.getClientsUseCase;
const saveLeadRepository = container.saveClientUseCase;

export const getLeads = createAsyncThunk(
  "leads/getLeads",
  async (params: FilterLeadsParams) => {
    return await getLeadsRepository.execute(params);
  }
);

export const saveLead = createAsyncThunk(
  "leads/saveLead",
  async (lead: LeadDTO) => {
    return await saveLeadRepository.execute(lead);
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLeads.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getLeads.fulfilled,
      (state, action: PayloadAction<ClientDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.leads = action.payload;
      }
    );
    builder.addCase(getLeads.rejected, (state, action) => {
      state.error = action.error.message || "Error in get all leads";
      state.isLoading = false;
    });

    builder.addCase(saveLead.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      saveLead.fulfilled,
      (state, action: PayloadAction<ClientDTO>) => {
        state.error = null;
        state.isLoading = false;
        state.leads.push(action.payload);
      }
    );
    builder.addCase(saveLead.rejected, (state, action) => {
      state.error = action.error.message || "Error in save lead";
      state.isLoading = false;
      addToast({
        title: "Error al guardar el lead",
        description: action.error.message || "Error in save lead",
        timeout: 2500,
      });
    });
  },
});

export default leadSlice.reducer;
