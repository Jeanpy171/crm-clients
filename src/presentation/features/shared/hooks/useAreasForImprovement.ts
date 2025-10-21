import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getAreasForImprovementCatalog } from "../../../../infrastructure/store/slices/areasForImprovement";

export const useAreasForImprovement = () => {
  const { areasForImprovement, isLoading, error } = useSelector(
    (state: RootState) => state.areasForImprovement
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!areasForImprovement.length) {
      handleGetAreasForImprovementCatalog();
    }
  }, [areasForImprovement]);

  const handleGetAreasForImprovementCatalog = () => {
    dispatch(getAreasForImprovementCatalog());
  };

  const getAreasForImprovementDescriptionByName = (name: string) => {
    if (!areasForImprovement.length) return name;

    return areasForImprovement.find((area) => area.name === name)?.description;
  };

  return { areasForImprovement, isLoading, error, getAreasForImprovementDescriptionByName };
};
