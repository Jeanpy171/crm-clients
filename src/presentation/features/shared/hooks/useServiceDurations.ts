import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getServiceDurationCatalog } from "../../../../infrastructure/store/slices/serviceDuration";

export const useServiceDurations = () => {
  const { serviceDurations, isLoading, error } = useSelector(
    (state: RootState) => state.serviceDurations
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!serviceDurations.length) {
      handleGetServiceDurationCatalog();
    }
  }, [serviceDurations]);

  const handleGetServiceDurationCatalog = () => {
    dispatch(getServiceDurationCatalog());
  };

  const getServiceDurationDescriptionByName = (name: string) => {
    if (!serviceDurations.length) return name;

    return serviceDurations.find((duration) => duration.name === name)?.description;
  };

  return { serviceDurations, isLoading, error, getServiceDurationDescriptionByName };
};
