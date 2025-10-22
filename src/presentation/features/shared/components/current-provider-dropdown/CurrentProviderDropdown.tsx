import { Select, SelectItem } from "@heroui/react";
import type { CurrentProvider } from "../../../../../core/domain/value-objects/contact";
import { useCurrentProviders } from "../../hooks/useCurrentProviders";

export const CurrentProviderDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: CurrentProvider) => void;
}) => {
  const { currentProviders, isLoading, error } = useCurrentProviders();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as CurrentProvider);
  };

  return (
    <Select
      label="Nombre de la empresa con la que cuenta actualmente el servicio"
      className="w-full"
      aria-label="Seleccionar proveedor actual"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {currentProviders.map((provider) => (
        <SelectItem key={provider.name}>{provider.description}</SelectItem>
      ))}
    </Select>
  );
};
