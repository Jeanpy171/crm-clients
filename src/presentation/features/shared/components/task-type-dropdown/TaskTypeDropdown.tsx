import { Select, SelectItem } from "@heroui/react";
import { useTaskTypes } from "../../hooks/useTaskTypes";
import type { TaskType } from "../../../../../core/domain/value-objects/task";

export const TaskTypeDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: TaskType) => void;
}) => {
  const { taskTypes, isLoading, error } = useTaskTypes();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.warn("Task type: ", e.target.value);
    onChange(e.target.value as TaskType);
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
      {taskTypes.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
