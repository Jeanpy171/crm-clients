import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import KanbanColumn from "./KanbanColumn";
import type { Lead } from "../../../../../../core/domain/entities/Lead";
import { InteractionPhase } from "../../../../../../core/domain/value-objects/contact";

interface KanbanBoardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onCreateLead: () => void;
  onLeadMove: (leadId: string, newState: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  leads,
  onLeadClick,
  onCreateLead,
  onLeadMove,
}) => {
  console.log("KanbanBoard rendering with leads:", leads);
  // Group leads by state
  const leadsByState = {
    Calificar: leads?.filter(
      (lead) => lead.data.interactionPhase === InteractionPhase.GRADE
    ),
    Desarrollar: leads?.filter(
      (lead) => lead.data.interactionPhase === InteractionPhase.DEVELOP
    ),
    Proponer: leads?.filter(
      (lead) => lead.data.interactionPhase === InteractionPhase.PROPOSE
    ),
    Cierre: leads?.filter(
      (lead) => lead.data.interactionPhase === InteractionPhase.CLOSING
    ),
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tablero Kanban - Mis clientes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KanbanColumn
          title="Calificar"
          leads={leadsByState.Calificar}
          count={leadsByState.Calificar?.length}
          onLeadClick={onLeadClick}
          onLeadMove={onLeadMove}
          state="Calificar"
        />

        <KanbanColumn
          title="Desarrollar"
          leads={leadsByState.Desarrollar}
          count={leadsByState.Desarrollar?.length}
          onLeadClick={onLeadClick}
          onLeadMove={onLeadMove}
          state="Desarrollar"
        />

        <KanbanColumn
          title="Proponer"
          leads={leadsByState.Proponer}
          count={leadsByState.Proponer?.length}
          onLeadClick={onLeadClick}
          onLeadMove={onLeadMove}
          state="Proponer"
        />

        <KanbanColumn
          title="Cierre"
          leads={leadsByState.Cierre}
          count={leadsByState.Cierre?.length}
          onLeadClick={onLeadClick}
          onLeadMove={onLeadMove}
          state="Cierre"
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
