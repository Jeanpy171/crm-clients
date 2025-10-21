import { Select, SelectItem } from "@heroui/react";
import { useInteractionPhases } from "../../hooks/useInteractionPhases";
import type { InteractionPhase } from "../../../../../core/domain/value-objects/contact";

export const InteractionPhaseDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: InteractionPhase) => void;
}) => {
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
    >
      {interactionPhases.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
