import { Select, SelectItem, type SelectProps } from "@heroui/react";
import { useInteractionPhases } from "../../hooks/useInteractionPhases";
import type { InteractionPhase } from "../../../../../core/domain/value-objects/contact";

interface InteractionPhaseDropdownProps extends Omit<SelectProps, "onChange" | "children"> {
  onChange: (arg0: InteractionPhase) => void;
}

export const InteractionPhaseDropdown = ({
  value,
  onChange,
  ...rest
}: InteractionPhaseDropdownProps) => {
  const { interactionPhases, isLoading, error } = useInteractionPhases();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as InteractionPhase);
  };

  return (
    <Select
      label="Filtrar por fase de interaccion"
      className="w-full sm:w-48"
      aria-label="Filtrar por fase de interaccion"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
      {...rest}
    >
      {interactionPhases.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
