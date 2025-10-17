import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { SignInUseCase } from "../../../modules/users/application/useCases/SignInUseCase";
// import { UserApiAdapter } from "../../../modules/users/infrastructure/adapters/UserApiAdapter";
import { SignOutUseCase } from "../../../modules/users/application/useCases/SignOutUseCase";
import { UserMockAdapter } from "../../../modules/users/infrastructure/adapters/UserMockAdapter";
import type { UserDTO } from "../../../modules/users/application/dtos/UserDTO";

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

// const repository = new UserApiAdapter();
const repository = new UserMockAdapter();

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: { username: string; password: string; role: string }) => {
    return await new SignInUseCase(repository).execute(
      payload.username,
      payload.password,
      payload.role
    );
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  return await new SignOutUseCase(repository).execute();
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
