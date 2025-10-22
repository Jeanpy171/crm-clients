import { Select, SelectItem } from "@heroui/react";
import type { InterestInNewService } from "../../../../../core/domain/value-objects/contact";
import { useInterestInNewService } from "../../hooks/useInterestInNewService";

export const InterestInNewServiceDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: InterestInNewService) => void;
}) => {
  const { interestInNewServices, isLoading, error } = useInterestInNewService();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as InterestInNewService);
  };

  return (
    <Select
      label="Del 1 al 10 ¿qué tan interesado está para adquirir el nuevo servicio?"
      className="w-full"
      aria-label="Seleccionar interés en nuevos servicios"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {interestInNewServices.map((interest) => (
        <SelectItem key={interest.name}>{interest.description}</SelectItem>
      ))}
    </Select>
  );
};
