import { Select, SelectItem } from "@heroui/react";
import type { ServiceDuration } from "../../../../../core/domain/value-objects/contact";
import { useServiceDurations } from "../../hooks/useServiceDurations";

export const ServiceDurationDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: ServiceDuration) => void;
}) => {
  const { serviceDurations, isLoading, error } = useServiceDurations();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ServiceDuration);
  };

  return (
    <Select
      label="Tiempo con el servicio actual"
      className="w-full sm:w-48"
      aria-label="Seleccionar tiempo con el servicio actual"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {serviceDurations.map((duration) => (
        <SelectItem key={duration.name}>{duration.description}</SelectItem>
      ))}
    </Select>
  );
};
