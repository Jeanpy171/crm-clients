import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { useEffect } from "react";
import { getTasksPriorityCatalog } from "../../../../infrastructure/store/slices/taskPriorities";

export const useTaskPriorities = () => {
  const { taskPriorities, isLoading, error } = useSelector(
    (state: RootState) => state.taskPriorities
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!taskPriorities.length) {
      handleGetTaskPriorityCatalog();
    }
  }, [taskPriorities]);

  const handleGetTaskPriorityCatalog = () => {
    dispatch(getTasksPriorityCatalog());
  };

  const getPriorityDescriptionByName = (name: string) => {
    if (!taskPriorities.length) return name;

    return taskPriorities.find((status) => status.name === name)?.description;
  };

  return { taskPriorities, isLoading, error, getPriorityDescriptionByName };
};
