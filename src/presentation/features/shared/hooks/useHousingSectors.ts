import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getHousingSectorCatalog } from "../../../../infrastructure/store/slices/housingSector";

export const useHousingSectors = () => {
  const { housingSectors, isLoading, error } = useSelector(
    (state: RootState) => state.housingSectors
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!housingSectors.length) {
      handleGetHousingSectorCatalog();
    }
  }, [housingSectors]);

  const handleGetHousingSectorCatalog = () => {
    dispatch(getHousingSectorCatalog());
  };

  const getHousingSectorDescriptionByName = (name: string) => {
    if (!housingSectors.length) return name;

    return housingSectors.find((sector) => sector.name === name)?.description;
  };

  return { housingSectors, isLoading, error, getHousingSectorDescriptionByName };
};
