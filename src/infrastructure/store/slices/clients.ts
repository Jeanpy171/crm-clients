import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { container } from "../../../config/di-container";
import { addToast } from "@heroui/react";
import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import type { FilterClientsParams } from "../../../core/domain/repositories/IClientRepository";

export interface ClientState {
  clients: ClientDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  isLoading: false,
  error: null,
};

const getClientsRepository = container.getClientsUseCase;
const saveClientRepository = container.saveClientUseCase;

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (params: FilterClientsParams) => {
    return await getClientsRepository.execute(params);
  }
);

export const saveClient = createAsyncThunk(
  "clients/saveClient",
  async (task: ClientDTO) => {
    return await saveClientRepository.execute(task);
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClients.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      getClients.fulfilled,
      (state, action: PayloadAction<ClientDTO[]>) => {
        state.error = null;
        state.isLoading = false;
        state.clients = action.payload;
      }
    );
    builder.addCase(getClients.rejected, (state, action) => {
      state.error = action.error.message || "Error in get all clients";
      state.isLoading = false;
    });

    builder.addCase(saveClient.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(
      saveClient.fulfilled,
      (state, action: PayloadAction<ClientDTO>) => {
        state.error = null;
        state.isLoading = false;
        state.clients.push(action.payload);
      }
    );
    builder.addCase(saveClient.rejected, (state, action) => {
      state.error = action.error.message || "Error in save client";
      state.isLoading = false;
      addToast({
        title: "Error al guardar el cliente",
        description: action.error.message || "Error in save client",
        timeout: 2500,
      });
    });
  },
});

export default clientSlice.reducer;
