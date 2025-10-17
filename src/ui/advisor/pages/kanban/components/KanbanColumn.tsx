import React from "react";
import { Card, CardBody, Badge } from "@heroui/react";
import KanbanCard from "./KanBanCard";
import type { Lead } from "../../../../../modules/leads/domain/entities/Lead";

interface KanbanColumnProps {
  title: string;
  leads: Lead[];
  count: number;
  state: string;
  onLeadClick: (lead: Lead) => void;
  onLeadMove: (leadId: string, newState: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  leads,
  count,
  state,
  onLeadClick,
  onLeadMove,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      onLeadMove(leadId, state);
    }
  };

  return (
    <Card className="h-full">
      <CardBody className="p-0 flex flex-col">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">{title}</h3>
          <Badge color="primary" variant="flat" size="sm">
            {count}
          </Badge>
        </div>

        <div
          className="p-2 flex-grow overflow-y-auto kanban-column"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {leads.length > 0 ? (
            <div className="space-y-2">
              {leads.map((lead) => (
                <KanbanCard
                  key={lead.id}
                  lead={lead}
                  onClick={() => onLeadClick(lead)}
                  onMove={onLeadMove}
                  currentState={state}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No hay clientes en esta columna
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default KanbanColumn;
