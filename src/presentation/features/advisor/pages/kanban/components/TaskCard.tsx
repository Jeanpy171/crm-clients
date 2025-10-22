import { useState } from "react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

interface KanbanCardProps {
  contact: { id: string } & Contact;
  onDragStart?: (columnId: string, taskId: string) => void; // ✅ nuevo
  onDragEnd?: () => void; // ✅ nuevo
  columnId?: string; // ✅ para identificar la columna origen
}

export const TaskCard = ({
  contact,
  onDragStart,
  onDragEnd,
  columnId,
}: KanbanCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { id, name, company, interestLevel, lastActivity } = contact || {};

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
    setIsDragging(true);
    onDragStart?.(columnId!, id); // ✅ Notificamos a la columna
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.(); // ✅ Notificamos fin del drag
  };

  const Description = ({ field, value }: { field: string; value: string }) => (
    <div key={field} className="flex gap-1 items-start">
      <h5 className="font-semibold">{field}:</h5>
      {value}
    </div>
  );

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-3 bg-white rounded-xl shadow cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
    >
      <CardHeader>
        <strong>{name}</strong>
      </CardHeader>
      <Divider />
      <CardBody>
        <Description field="Empresa" value={company} />
        <Description field="Interés" value={interestLevel} />
        <Description
          field="Última Actividad"
          value={lastActivity.toDateString()}
        />
      </CardBody>
    </Card>
  );
};
