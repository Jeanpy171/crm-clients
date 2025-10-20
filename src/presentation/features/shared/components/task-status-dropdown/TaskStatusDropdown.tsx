import { Select, SelectItem } from "@heroui/react";
import { useTaskStatus } from "../../hooks/useTaskStatus";
import type { TaskStatus } from "../../../../../core/domain/value-objects/task";

export const TaskStatusDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: TaskStatus) => void;
}) => {
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
    >
      {taskStatus.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
