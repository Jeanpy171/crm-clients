import React from "react";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Lead } from "../../../../../modules/leads/domain/entities/Lead";

interface KanbanCardProps {
  lead: Lead;
  onClick: () => void;
  onMove: (leadId: string, newState: string) => void;
  currentState: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  lead,
  onClick,
  onMove,
  currentState,
}) => {
  const getInterestColor = () => {
    switch (lead.interest) {
      case "Poco interesado":
        return "warning";
      case "Interesado":
        return "success";
      case "Medianamente interesado":
        return "primary";
      default:
        return "default";
    }
  };

  const states = ["Calificar", "Desarrollar", "Proponer", "Cierre"];
  const availableStates = states.filter((state) => state !== currentState);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", lead.id);
  };

  return (
    <Card
      isPressable
      onPress={onClick}
      draggable={true}
      onDragStart={handleDragStart}
      className="border border-gray-200 hover:border-primary-300 transition-colors cursor-move"
      shadow="none"
    >
      <CardBody className="p-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-gray-800">{lead.name}</h4>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={(e: any) => {
                  e.stopPropagation();
                }}
              >
                <Icon icon="lucide:more-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones de lead">
              <DropdownItem
                key="details"
                startContent={<Icon icon="lucide:info" />}
                onPress={(e: any) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                Ver detalles
              </DropdownItem>
              <DropdownItem
                key="edit"
                startContent={<Icon icon="lucide:edit" />}
              >
                Editar
              </DropdownItem>
              {
                availableStates.map((state: string) => (
                  <DropdownItem
                    key={`move-to-${state}`}
                    startContent={<Icon icon="lucide:move-right" />}
                    onPress={(e: any) => {
                      e.stopPropagation();
                      onMove(lead.id, state);
                    }}
                  >
                    Mover a {state}
                  </DropdownItem>
                )) as any
              }
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Icon icon="lucide:phone" className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-600">{lead.phone}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Chip size="sm" color={getInterestColor()} variant="flat">
            {lead.interest}
          </Chip>

          <span className="text-xs text-gray-500">
            {new Date(lead.lastActivity).toLocaleDateString()}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default KanbanCard;
