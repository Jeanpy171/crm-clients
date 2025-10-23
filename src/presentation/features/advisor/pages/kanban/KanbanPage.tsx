import React from "react";
import type { Contact } from "../../../../../core/domain/entities/Contact";
import { KanbanBoard } from "./components/KanbanBoard";

interface AdvisorKanbanProps {
  onContactClick: (contact: { id: string; data: Contact }) => void;
  onCreateLead: () => void;
  onLeadMove: (contactId: string, newState: string) => void;
}

const KanbanPage: React.FC<AdvisorKanbanProps> = () => {
  // console.log("AdvisorKanban component rendering with leads:", leads);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tablero Kanban - Seguimiento</h2>
      </div>

      <KanbanBoard />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div> */}
    </div>
  );
};

export default KanbanPage;
