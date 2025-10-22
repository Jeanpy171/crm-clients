import { Select, SelectItem } from "@heroui/react";
import type { AreasForImprovement } from "../../../../../core/domain/value-objects/contact";
import { useAreasForImprovement } from "../../hooks/useAreasForImprovement";

export const AreasForImprovementDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: AreasForImprovement) => void;
}) => {
  const { areasForImprovement, isLoading, error } = useAreasForImprovement();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as AreasForImprovement);
  };

  return (
    <Select
      label="Áreas de mejora"
      className="w-full"
      aria-label="Seleccionar áreas de mejora"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {areasForImprovement.map((area) => (
        <SelectItem key={area.name}>{area.description}</SelectItem>
      ))}
    </Select>
  );
};
