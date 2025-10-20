import { useDispatch, useSelector } from "react-redux";

import { SessionLocalStorageAdapter } from "../../../../core/storage/adapters/SessionLocalStorageAdapter";
import { useEffect } from "react";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import {
  setUser,
  signIn,
  signOut,
} from "../../../../infrastructure/store/slices/auth";
import { UserMapper } from "../../../../infrastructure/http/mappers/UserMapper";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!user) {
      handleVerifyUser();
    }
  }, [user]);

  const handleLogin = (username: string, password: string, role: string) => {
    dispatch(signIn({ username, password, role }));
  };

  const handleLogOut = () => {
    dispatch(signOut());
  };

  const handleVerifyUser = async () => {
    const storedUser = await new SessionLocalStorageAdapter().getUser();
    if (storedUser) {
      dispatch(setUser(UserMapper.toDomain(JSON.parse(storedUser))));
    }
  };

  return {
    user: user ? UserMapper.toDomain(user) : null,
    loading,
    error,
    handleLogin,
    handleLogOut,
  };
};
