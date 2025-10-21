import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getInteractionPhaseCatalog } from "../../../../infrastructure/store/slices/interactionPhase";

export const useInteractionPhases = () => {
  const { interactionPhases, isLoading, error } = useSelector(
    (state: RootState) => state.interactionPhases
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!interactionPhases.length) {
      handleGetInteractionPhaseCatalog();
    }
  }, [interactionPhases]);

  const handleGetInteractionPhaseCatalog = () => {
    dispatch(getInteractionPhaseCatalog());
  };

  const getPhaseDescriptionByName = (name: string) => {
    if (!interactionPhases.length) return name;

    return interactionPhases.find((status) => status.name === name)
      ?.description;
  };

  return { interactionPhases, isLoading, error, getPhaseDescriptionByName };
};
