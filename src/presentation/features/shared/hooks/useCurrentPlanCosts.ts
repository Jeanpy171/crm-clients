import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getCurrentPlanCostCatalog } from "../../../../infrastructure/store/slices/currentPlanCost";

export const useCurrentPlanCosts = () => {
  const { currentPlanCosts, isLoading, error } = useSelector(
    (state: RootState) => state.currentPlanCosts
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!currentPlanCosts.length) {
      handleGetCurrentPlanCostCatalog();
    }
  }, [currentPlanCosts]);

  const handleGetCurrentPlanCostCatalog = () => {
    dispatch(getCurrentPlanCostCatalog());
  };

  const getCurrentPlanCostDescriptionByName = (name: string) => {
    if (!currentPlanCosts.length) return name;

    return currentPlanCosts.find((cost) => cost.name === name)?.description;
  };

  return { currentPlanCosts, isLoading, error, getCurrentPlanCostDescriptionByName };
};
