import { Select, SelectItem } from "@heroui/react";
import type { HousingSector } from "../../../../../core/domain/value-objects/contact";
import { useHousingSectors } from "../../hooks/useHousingSectors";

export const HousingSectorDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: HousingSector) => void;
}) => {
  const { housingSectors, isLoading, error } = useHousingSectors();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as HousingSector);
  };

  return (
    <Select
      label="Sector de vivienda"
      className="w-full sm:w-48"
      aria-label="Seleccionar sector de vivienda"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {housingSectors.map((sector) => (
        <SelectItem key={sector.name}>{sector.description}</SelectItem>
      ))}
    </Select>
  );
};
