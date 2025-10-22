import { Select, SelectItem, type SelectProps } from "@heroui/react";
import { useTaskStatus } from "../../hooks/useTaskStatus";
import type { TaskStatus } from "../../../../../core/domain/value-objects/task";

interface TaskStatusDropdownProps
  extends Omit<SelectProps, "onChange" | "children"> {
  onChange: (arg0: TaskStatus) => void;
}

export const TaskStatusDropdown = ({
  value,
  onChange,
  ...rest
}: TaskStatusDropdownProps) => {
  const { taskStatus, isLoading, error } = useTaskStatus();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.warn("Task status: ", e.target.value);
    onChange(e.target.value as TaskStatus);
  };
  return (
    <Select
      label="Filtrar por estado"
      className="w-full sm:w-48"
      aria-label="Filtrar por estado de tarea"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
      {...rest}
    >
      {taskStatus.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
