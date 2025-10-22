import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getInterestLevelCatalog } from "../../../../infrastructure/store/slices/interestLevel";

export const useInterestLevels = () => {
  const { interestLevels, isLoading, error } = useSelector(
    (state: RootState) => state.interestLevels
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!interestLevels.length) {
      handleGetInterestLevelCatalog();
    }
  }, [interestLevels]);

  const handleGetInterestLevelCatalog = () => {
    dispatch(getInterestLevelCatalog());
  };

  const getInterestDescriptionByName = (name: string) => {
    return (
      interestLevels.find((status) => status.name === name)?.description || name
    );
  };

  return { interestLevels, isLoading, error, getInterestDescriptionByName };
};
