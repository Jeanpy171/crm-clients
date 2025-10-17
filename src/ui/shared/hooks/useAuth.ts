import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../core/store/store";
import { setUser, signIn, signOut } from "../../../core/store/slices/auth";
import { UserMapper } from "../../../modules/users/application/mapper/UserMapper";
import { SessionLocalStorageAdapter } from "../../../core/storage/adapters/SessionLocalStorageAdapter";
import { useEffect } from "react";

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
      dispatch(setUser(UserMapper.fromDTO(JSON.parse(storedUser))));
    }
  };

  return {
    user: user ? UserMapper.fromDTO(user) : null,
    loading,
    error,
    handleLogin,
    handleLogOut,
  };
};
