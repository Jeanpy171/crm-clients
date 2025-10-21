import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getContactStatusCatalog } from "../../../../infrastructure/store/slices/contactStatus";

export const useContactStatus = () => {
  const { contactStatus, isLoading, error } = useSelector(
    (state: RootState) => state.contactStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!contactStatus.length) {
      handleGetContactStatusCatalog();
    }
  }, [contactStatus]);

  const handleGetContactStatusCatalog = () => {
    dispatch(getContactStatusCatalog());
  };

  const getStatusDescriptionByName = (name: string) => {
    if (!contactStatus.length) return name;

    return contactStatus.find((status) => status.name === name)?.description;
  };

  return { contactStatus, isLoading, error, getStatusDescriptionByName };
};
