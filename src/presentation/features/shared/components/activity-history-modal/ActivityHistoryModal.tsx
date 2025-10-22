import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "@heroui/react";
import type { Contact } from "../../../../../core/domain/entities/Contact";
import { InteractionPhase } from "../../../../../core/domain/value-objects/contact";

interface ActivityHistoryModalProps extends Omit<ModalProps, "children"> {
  contact: Contact | null;
}

const activities = [
  {
    id: "akdnfskdnflksdnflksdnlksd",
    operation: "CREATION",
    interactionPhase: InteractionPhase.GRADE,
    advisor: "snjabfojabsfoajs",
    description: "Creacion de Cliente",
    createdAt: new Date().toDateString(),
  },
  {
    id: "akdnfskdnflksdnflksdnlksd",
    operation: "UPDATE",
    interactionPhase: InteractionPhase.CLOSING,
    advisor: "snjabfojabsfoajs",
    description: "Cliente cerrado con exito, contrato firmado",
    createdAt: new Date().toDateString(),
  },
];

const AIInsights = () => {
  return (
    <div className="w-full bg-blue-50 border-1 border-zinc-200 p-2 rounded-sm flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <strong>🤖 Análisis de IA</strong>
        <Button>Analizar</Button>
      </div>
      <Divider />
      <em>
        Haz click en "Analizar" para obtener insights de IA sobre este lead.
      </em>
    </div>
  );
};

const History = ({ activities }: { activities: any[] }) => {
  return (
    <div className="w-full bg-blue-50 border-1 border-zinc-200 p-2 rounded-sm flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <strong>📅 Actividades</strong>
      </div>
      <Divider />
      {activities.map((activity, index) => (
        <>
          <span className="flex flex-col gap-2">
            <p className="font-semibold">{activity.operation}</p>
            <p>{activity.description}</p>
            <p className="text-sm text-zinc-500">
              Asesor: {activity.advisor} • {activity.createdAt}
            </p>
          </span>
          {index + 1 !== activities.length ? <Divider /> : null}
        </>
      ))}
    </div>
  );
};

export const ActivityHistoryModal = ({
  contact,
  ...rest
}: ActivityHistoryModalProps) => {
  const { name, company, advisor, interactionPhase } = contact || {};
  return (
    <Modal {...rest}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3">
              <strong>{name}</strong>
              <Divider />
              <span className="flex text-sm justify-evenly items-center">
                <h4>
                  <strong>Empresa</strong>: {company}
                </h4>
                <h4>
                  <strong>Asesor</strong>: {advisor}
                </h4>
                <h4>
                  <strong>Etapa</strong>: {interactionPhase}
                </h4>
              </span>
            </ModalHeader>
            <ModalBody>
              <History activities={activities} />
              <AIInsights />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cerrar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
