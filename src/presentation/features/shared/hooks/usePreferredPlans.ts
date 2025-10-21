import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getPreferredPlanCatalog } from "../../../../infrastructure/store/slices/preferredPlan";

export const usePreferredPlans = () => {
  const { preferredPlans, isLoading, error } = useSelector(
    (state: RootState) => state.preferredPlans
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!preferredPlans.length) {
      handleGetPreferredPlanCatalog();
    }
  }, [preferredPlans]);

  const handleGetPreferredPlanCatalog = () => {
    dispatch(getPreferredPlanCatalog());
  };

  const getPreferredPlanDescriptionByName = (name: string) => {
    if (!preferredPlans.length) return name;

    return preferredPlans.find((plan) => plan.name === name)?.description;
  };

  return { preferredPlans, isLoading, error, getPreferredPlanDescriptionByName };
};
