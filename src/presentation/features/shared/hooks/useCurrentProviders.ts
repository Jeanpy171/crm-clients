import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getCurrentProviderCatalog } from "../../../../infrastructure/store/slices/currentProvider";

export const useCurrentProviders = () => {
  const { currentProviders, isLoading, error } = useSelector(
    (state: RootState) => state.currentProviders
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!currentProviders.length) {
      handleGetCurrentProviderCatalog();
    }
  }, [currentProviders]);

  const handleGetCurrentProviderCatalog = () => {
    dispatch(getCurrentProviderCatalog());
  };

  const getCurrentProviderDescriptionByName = (name: string) => {
    if (!currentProviders.length) return name;

    return currentProviders.find((provider) => provider.name === name)?.description;
  };

  return { currentProviders, isLoading, error, getCurrentProviderDescriptionByName };
};
