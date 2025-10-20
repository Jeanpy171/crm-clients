import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getTaskStatusCatalog } from "../../../../infrastructure/store/slices/taskStatus";

export const useTaskStatus = () => {
  const { taskStatus, isLoading, error } = useSelector(
    (state: RootState) => state.taskStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!taskStatus.length) {
      handleGetTaskStatusCatalog();
    }
  }, [taskStatus]);

  const handleGetTaskStatusCatalog = () => {
    dispatch(getTaskStatusCatalog());
  };

  const getStatusDescriptionByName = (name: string) => {
    if (!taskStatus.length) return name;

    return taskStatus.find((status) => status.name === name)?.description;
  };

  return { taskStatus, isLoading, error, getStatusDescriptionByName };
};
