import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { getTaskTypeCatalog } from "../../../../infrastructure/store/slices/taskTypes";
import { useEffect } from "react";

export const useTaskTypes = () => {
  const { taskTypes, isLoading, error } = useSelector(
    (state: RootState) => state.taskTypes
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!taskTypes.length) {
      handleGetTaskTypeCatalog();
    }
  }, [taskTypes]);

  const handleGetTaskTypeCatalog = () => {
    dispatch(getTaskTypeCatalog());
  };

  const getTypeDescriptionByName = (name: string) => {
    if (!taskTypes.length) return name;

    return taskTypes.find((status) => status.name === name)?.description;
  };

  return { taskTypes, isLoading, error, getTypeDescriptionByName };
};
