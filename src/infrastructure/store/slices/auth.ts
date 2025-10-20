import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { UserDTO } from "../../../core/application/dtos/users/UserDTO";
import { container } from "../../../config/di-container";

export interface AuthState {
  user: UserDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const signInRepository = container.signInUseCase;
const signOutRepository = container.signOutUseCase;

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: { username: string; password: string; role: string }) => {
    return await signInRepository.execute(
      payload.username,
      payload.password,
      payload.role
    );
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  return await signOutRepository.execute();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<UserDTO | null>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      }
    );
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to sign in";
    });
    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
