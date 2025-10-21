import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import type { Client } from "../../../../../core/domain/entities/Client";
import { InteractionPhase } from "../../../../../core/domain/value-objects/contact";
import { Icon } from "@iconify/react";
import { useInteractionPhases } from "../../hooks/useInteractionPhases";
import { useInterestLevels } from "../../hooks/useInterestLevels";

const getColorByInteraction = (interactionPase: InteractionPhase) => {
  const colors = {
    [InteractionPhase.GRADE]: "bg-blue-100 text-blue-700",
    [InteractionPhase.DEVELOP]: "bg-amber-100 text-amber-700",
    [InteractionPhase.PROPOSE]: "bg-purple-100 text-purple-700",
    [InteractionPhase.CLOSING]: "bg-green-100 text-green-700",
  };
  return colors[interactionPase];
};

export const ContactCard = ({
  contact,
  onClick,
}: {
  contact: Lead | Client;
  onClick: (arg0: Lead | Client) => void;
}) => {
  const { getPhaseDescriptionByName } = useInteractionPhases();
  const { getInterestDescriptionByName } = useInterestLevels();
  return (
    <Card
      key={contact.id}
      shadow="sm"
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(contact)}
    >
      <CardHeader className="flex justify-between items-center">
        <h4 className="font-medium">{contact.data.name}</h4>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${getColorByInteraction(
            contact.data.interactionPhase
          )}`}
        >
          {getPhaseDescriptionByName(contact.data.interactionPhase)}
        </span>
      </CardHeader>
      <Divider />
      <CardBody className="p-4 gap-2 flex flex-col">
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <Icon icon="lucide:phone" className="inline w-4 h-4 mr-1" />
            <strong>Telefono:</strong> {contact.data.phone}
          </p>
          <p>
            <Icon icon="lucide:building" className="inline w-4 h-4 mr-1" />
            <strong>Compañia:</strong> {contact.data.company}
          </p>
          <p>
            <Icon icon="lucide:star" className="inline w-4 h-4 mr-1" />
            <strong>Nivel de Interes:</strong>{" "}
            {getInterestDescriptionByName(contact.data.interestLevel)}
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col items-start justify-start text-sm">
        <p className=" text-gray-500">
          <strong>Fecha de Creacion:</strong>{" "}
          {new Date(contact.data.createdAt).toLocaleDateString()}
        </p>
        <p className=" text-gray-500">
          <strong>Última actividad:</strong>{" "}
          {new Date(contact.data.lastActivity).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};
