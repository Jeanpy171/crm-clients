import { Select, SelectItem, type SelectProps } from "@heroui/react";
import type { InterestLevel } from "../../../../../core/domain/value-objects/contact";
import { useInterestLevels } from "../../hooks/useInterestLevels";

interface InterestLevelDropdownProps
  extends Omit<SelectProps, "onChange" | "children"> {
  onChange: (arg0: InterestLevel) => void;
}

export const InterestLevelDropdown = ({
  value,
  onChange,
  ...rest
}: InterestLevelDropdownProps) => {
  const { interestLevels, isLoading, error } = useInterestLevels();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as InterestLevel);
  };

  return (
    <Select
      label="Filtrar por nivel de interes"
      className="w-full sm:w-48"
      aria-label="Filtrar por nivel de interes"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
      {...rest}
    >
      {interestLevels.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
