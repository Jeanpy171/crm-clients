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
    return (
      contactStatus.find((status) => status.name === name)?.description || name
    );
  };

  return { contactStatus, isLoading, error, getStatusDescriptionByName };
};
