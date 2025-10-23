import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "@heroui/react";
import type { Contact } from "../../../../../core/domain/entities/Contact";
import { mapValueToChipColor } from "../../helpers/chipHelper";
import { useContactHistory } from "../../hooks/useContactHistory";
import { useEffect } from "react";
import type { HistoryDTO } from "../../../../../core/application/dtos/contact/HistoryDTO";
import { ActivityHistory } from "./components/ActivityHistory";

interface ContactTracingModalProps extends Omit<ModalProps, "children"> {
  contact: Contact | null;
}

type ChipCategory =
  | "taskStatus"
  | "interestLevel"
  | "contactStatus"
  | "interactionPhase"
  | "taskType";

// Props para tarjetas descriptivas
type DescriptionCardProps =
  | {
      title: string;
      type: "chip";
      className?: string;
      data: Record<string, { value: string; category: ChipCategory }>;
    }
  | {
      title: string;
      type?: "text";
      className?: string;
      data: Record<string, string>;
    };

// 🔹 Tarjeta de descripción reutilizable
const DescriptionCard = ({
  title,
  data,
  className = "",
  type = "text",
}: DescriptionCardProps) => (
  <Card className={`w-full shadow-none bg-white border-l-4 ${className}`}>
    <CardHeader className="pb-2">
      <h4 className="font-bold text-lg">{title}</h4>
    </CardHeader>
    <CardBody className="space-y-1">
      {Object.entries(data).map(([key, val]) => {
        const content =
          type === "chip" ? (
            <Chip
              size="sm"
              variant="flat"
              className={mapValueToChipColor(val.value, val.category)}
            >
              {val.value}
            </Chip>
          ) : (
            <span>{val}</span>
          );

        return (
          <div key={key} className="flex gap-1 items-start">
            <h5 className="font-semibold">{key}:</h5>
            {content}
          </div>
        );
      })}
    </CardBody>
  </Card>
);

export const GeneralInformationCard = ({
  contact,
}: {
  contact: Contact | null;
}) => {
  if (!contact) return null;

  const {
    name = "",
    company = "",
    email = "",
    createdAt = new Date(),
    lastActivity = new Date(),
    followUpNotes = "",
    interactionPhase = "",
    interestLevel = "",
    status = "",
    phone = "",
  } = contact;

  return (
    <Card className="w-full">
      <CardHeader className="font-bold">Informacion General</CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <DescriptionCard
          title="Contacto"
          className="border-l-blue-400"
          data={{
            Nombre: name,
            Email: email,
            Teléfono: phone,
            Empresa: company,
          }}
        />
        <DescriptionCard
          title="Estado"
          type="chip"
          className="border-l-green-400"
          data={{
            Estado: { value: status, category: "contactStatus" },
            Interés: { value: interestLevel, category: "interestLevel" },
            Fase: { value: interactionPhase, category: "interactionPhase" },
          }}
        />
        <DescriptionCard
          title="Gestión"
          className="border-l-orange-400"
          data={{
            Creado: createdAt.toDateString(),
            "Última actividad": lastActivity.toDateString(),
          }}
        />
        <DescriptionCard
          title="Notas"
          className="bg-orange-50 border-l-orange-400"
          data={{
            Detalle: followUpNotes.trim()
              ? followUpNotes
              : "Sin notas registradas",
          }}
        />
      </CardBody>
    </Card>
  );
};

export const ContactTracingModal = ({
  contact,
  ...rest
}: ContactTracingModalProps) => {
  const { name, company, interactionPhase, id } = contact || {};

  const handleSetHistory = (history: HistoryDTO[]) => {
    contact?.setHistory(history);
  };

  return (
    <Modal {...rest}>
      <ModalContent className="max-h-[90vh] flex flex-col">
        {(onClose) => (
          <>
            <ModalHeader className="bg-blue-500 text-white">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Detalle de {name}</h3>
                <h4 className="text-sm text-blue-100">
                  {company} • {interactionPhase}
                </h4>
              </div>
            </ModalHeader>

            <ModalBody className="overflow-y-auto max-h-[60vh] px-4 py-4 space-y-6">
              <div className="flex justify-start items-start gap-2">
                <GeneralInformationCard contact={contact || null} />
                <ActivityHistory
                  history={contact?.history || []}
                  idContact={id || null}
                  onSetHistory={handleSetHistory}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="primary">Editar</Button>
              <Button color="secondary">Crear tarea</Button>
              <Button onPress={onClose} variant="light">
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
