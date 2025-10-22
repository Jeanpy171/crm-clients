import { Select, SelectItem } from "@heroui/react";
import type { PreferredPlan } from "../../../../../core/domain/value-objects/contact";
import { usePreferredPlans } from "../../hooks/usePreferredPlans";

export const PreferredPlanDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: PreferredPlan) => void;
}) => {
  const { preferredPlans, isLoading, error } = usePreferredPlans();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as PreferredPlan);
  };

  return (
    <Select
      label="¿Qué plan le gustó más?"
      className="w-full"
      aria-label="Seleccionar plan preferido"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {preferredPlans.map((plan) => (
        <SelectItem key={plan.name}>{plan.description}</SelectItem>
      ))}
    </Select>
  );
};
