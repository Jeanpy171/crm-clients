import { Select, SelectItem } from "@heroui/react";
import type { CurrentPlanCost } from "../../../../../core/domain/value-objects/contact";
import { useCurrentPlanCosts } from "../../hooks/useCurrentPlanCosts";

export const CurrentPlanCostDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: CurrentPlanCost) => void;
}) => {
  const { currentPlanCosts, isLoading, error } = useCurrentPlanCosts();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as CurrentPlanCost);
  };

  return (
    <Select
      label="Valor del plan actual"
      className="w-full"
      aria-label="Seleccionar valor del plan actual"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {currentPlanCosts.map((cost) => (
        <SelectItem key={cost.name}>{cost.description}</SelectItem>
      ))}
    </Select>
  );
};
