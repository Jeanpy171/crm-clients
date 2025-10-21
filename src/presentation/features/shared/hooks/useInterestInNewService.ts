import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getInterestInNewServiceCatalog } from "../../../../infrastructure/store/slices/interestInNewService";

export const useInterestInNewService = () => {
  const { interestInNewServices, isLoading, error } = useSelector(
    (state: RootState) => state.interestInNewServices
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!interestInNewServices.length) {
      handleGetInterestInNewServiceCatalog();
    }
  }, [interestInNewServices]);

  const handleGetInterestInNewServiceCatalog = () => {
    dispatch(getInterestInNewServiceCatalog());
  };

  const getInterestInNewServiceDescriptionByName = (name: string) => {
    if (!interestInNewServices.length) return name;

    return interestInNewServices.find((interest) => interest.name === name)?.description;
  };

  return { interestInNewServices, isLoading, error, getInterestInNewServiceDescriptionByName };
};
