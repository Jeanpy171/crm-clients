import { Select, SelectItem } from "@heroui/react";
import { useContactStatus } from "../../hooks/useContactStatus";
import type { ContactStatus } from "../../../../../core/domain/value-objects/contact";

export const ContactStatusDropdown = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (arg0: ContactStatus) => void;
}) => {
  const { contactStatus, isLoading, error } = useContactStatus();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ContactStatus);
  };

  return (
    <Select
      label="Filtrar por estado"
      className="w-full sm:w-48"
      aria-label="Filtrar por estado"
      value={value ?? ""}
      isLoading={isLoading}
      errorMessage={error}
      onChange={handleSelectionChange}
    >
      {contactStatus.map((status) => (
        <SelectItem key={status.name}>{status.description}</SelectItem>
      ))}
    </Select>
  );
};
