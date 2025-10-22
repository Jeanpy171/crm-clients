import { Select, SelectItem } from "@heroui/react";
import type { ServiceSatisfaction } from "../../../../../core/domain/value-objects/contact";
import { useServiceSatisfaction } from "../../hooks/useServiceSatisfaction";

export const ServiceSatisfactionDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: ServiceSatisfaction) => void;
}) => {
  const { serviceSatisfactions, isLoading, error } = useServiceSatisfaction();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ServiceSatisfaction);
  };

  return (
    <Select
      label="Satisfacción del servicio"
      className="w-full"
      aria-label="Seleccionar satisfacción del servicio"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {serviceSatisfactions.map((satisfaction) => (
        <SelectItem key={satisfaction.name}>{satisfaction.description}</SelectItem>
      ))}
    </Select>
  );
};
