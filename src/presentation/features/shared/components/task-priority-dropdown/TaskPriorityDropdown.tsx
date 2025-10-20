import { Select, SelectItem } from "@heroui/react";
import { useTaskTypes } from "../../hooks/useTaskTypes";
import type {
  TaskPriority,
  TaskType,
} from "../../../../../core/domain/value-objects/task";
import { useTaskPriorities } from "../../hooks/useTaskPriorities";

export const TaskPriorityDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: TaskPriority) => void;
}) => {
  const { taskPriorities, isLoading, error } = useTaskPriorities();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.warn("Task type: ", e.target.value);
    onChange(e.target.value as TaskPriority);
  };

  return (
    <Select
      label="Filtrar por tipo"
      className="w-full sm:w-48"
      aria-label="Filtrar por tipo de tarea"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {taskPriorities.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
