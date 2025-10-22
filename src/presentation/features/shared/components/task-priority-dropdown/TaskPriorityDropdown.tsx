import { Select, SelectItem, type SelectProps } from "@heroui/react";
import type {
  TaskPriority,
  TaskType,
} from "../../../../../core/domain/value-objects/task";
import { useTaskPriorities } from "../../hooks/useTaskPriorities";

interface TaskPriorityDropdownProps extends Omit<SelectProps, "onChange" | "children"> {
  onChange: (arg0: TaskPriority) => void;
}

export const TaskPriorityDropdown = ({
  value,
  onChange,
  ...rest
}: TaskPriorityDropdownProps) => {
  const { taskPriorities, isLoading, error } = useTaskPriorities();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.warn("Task type: ", e.target.value);
    onChange(e.target.value as TaskPriority);
  };

  return (
    <Select
      label="Filtrar por prioridad"
      className="w-full sm:w-48"
      aria-label="Filtrar por tipo de tarea"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
      {...rest}
    >
      {taskPriorities.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
