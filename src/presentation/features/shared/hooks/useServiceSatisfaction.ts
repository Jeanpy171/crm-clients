import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getServiceSatisfactionCatalog } from "../../../../infrastructure/store/slices/serviceSatisfaction";

export const useServiceSatisfaction = () => {
  const { serviceSatisfactions, isLoading, error } = useSelector(
    (state: RootState) => state.serviceSatisfactions
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!serviceSatisfactions.length) {
      handleGetServiceSatisfactionCatalog();
    }
  }, [serviceSatisfactions]);

  const handleGetServiceSatisfactionCatalog = () => {
    dispatch(getServiceSatisfactionCatalog());
  };

  const getServiceSatisfactionDescriptionByName = (name: string) => {
    if (!serviceSatisfactions.length) return name;

    return serviceSatisfactions.find((satisfaction) => satisfaction.name === name)?.description;
  };

  return { serviceSatisfactions, isLoading, error, getServiceSatisfactionDescriptionByName };
};
