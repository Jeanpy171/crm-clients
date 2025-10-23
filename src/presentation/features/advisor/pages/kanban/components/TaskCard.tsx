import { useState } from "react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { InteractionPhase } from "../../../../../../core/domain/value-objects/contact";

interface KanbanCardProps {
  contact: Contact;
  onDragStart?: (columnId: string, taskId: string) => void;
  onDragEnd?: () => void;
  onViewContactData: (arg0: Contact | null) => void;
  columnId?: string;
}

export const TaskCard = ({
  contact,
  onDragStart,
  onDragEnd,
  onViewContactData,
  columnId,
}: KanbanCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { id, name, company, interestLevel, lastActivity, interactionPhase } =
    contact || {};

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
    setIsDragging(true);
    onDragStart?.(columnId!, id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  const Description = ({ field, value }: { field: string; value: string }) => (
    <div key={field} className="flex gap-1 items-start text-sm text-gray-700">
      <h5 className="font-semibold text-zinc-500">{field}:</h5>
      {value}
    </div>
  );

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-3 bg-white rounded-xl shadow cursor-grab active:cursor-grabbing transition-all ease-in-out transform w-full border-l-blue-800 border-l-4 hover:scale-105 hover:rotate-3 ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
    >
      <CardHeader>
        <strong>{name}</strong>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        <Description field="Empresa" value={company} />
        <Description field="Interés" value={interestLevel} />
        <Description
          field="Última Actividad"
          value={lastActivity.toDateString()}
        />
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-start">
          <Button
            size="sm"
            color="primary"
            variant="flat"
            onPress={() => onViewContactData(contact)}
          >
            Ver
          </Button>
          {interactionPhase !== InteractionPhase.CLOSING && (
            <Button size="sm" color="success" variant="flat">
              Avanzar
            </Button>
          )}
          <Button size="sm" color="warning" variant="flat">
            Calificar
          </Button>
          <Button size="sm" color="danger" variant="flat">
            Eliminar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
