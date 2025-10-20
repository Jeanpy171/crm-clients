import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import {
  getTasks,
  saveTask,
} from "../../../../infrastructure/store/slices/tasks";
import type { TaskDTO } from "../../../../core/application/dtos/tasks/TaskDTO";
import { TaskMapper } from "../../../../infrastructure/http/mappers/TaskMapper";
import { addToast } from "@heroui/react";

export const useTasks = () => {
  const { tasks, isLoading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch<AppDispatch>();
  //   const [tasks, setTasks] = useState<Task[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tasks.length) {
      handleGetTasks();
    }
  }, [tasks]);

  const handleGetTasks = () => {
    dispatch(getTasks());
  };

  const handleSaveTask = async (task: TaskDTO) => {
    const resultAction = await dispatch(saveTask(task));
    console.error(resultAction);
    if (saveTask.fulfilled.match(resultAction)) {
      const newTask = resultAction.payload;
      console.log("Nuevo task guardado:", newTask);
    } else {
      console.error("Error al guardar el task");
      addToast({
        title: "Error al registrar la tarea",
        description: error || "Error in save task",
        color: "danger",
        timeout: 2500,
      });
    }
  };

  //   const handleGetTasks = async () => {
  //     try {
  //       setIsLoading(true);
  //       //   const allTasks = await getTasksRepository.execute();
  //       //   console.warn("TASKS EN HOOK: ", allTasks);
  //       setTasks(allTasks.map(TaskMapper.toDomain));
  //     } catch (error: any) {
  //       console.error("Error in task hook: ", error);
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleSaveTask = async () => {
  //     try {
  //       setIsLoading(true);
  //       const allTasks = await getTasksRepository.execute();
  //       console.warn("TASKS EN HOOK: ", allTasks);
  //       setTasks(allTasks.map(TaskMapper.toDomain));
  //     } catch (error: any) {
  //       console.error("Error in task hook: ", error);
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return {
    tasks: tasks ? tasks?.map(TaskMapper.toDomain) : [],
    isLoading,
    error,
    handleSaveTask,
  };
};
