import React from "react";

import KanbanBoard from "./components/KanbanBoard";
import type { Lead } from "../../../../modules/leads/domain/entities/Lead";

interface AdvisorKanbanProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onCreateLead: () => void;
  onLeadMove: (leadId: string, newState: string) => void;
}

const KanbanPage: React.FC<AdvisorKanbanProps> = ({
  leads,
  onLeadClick,
  onCreateLead,
  onLeadMove,
}) => {
  console.log("AdvisorKanban component rendering with leads:", leads);
  return (
    <KanbanBoard
      leads={leads}
      onLeadClick={onLeadClick}
      onCreateLead={onCreateLead}
      onLeadMove={onLeadMove}
    />
  );
};

export default KanbanPage;
