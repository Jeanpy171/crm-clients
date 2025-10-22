import React, { useEffect, useState } from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import { InteractionPhase } from "../../../../../core/domain/value-objects/contact";
import { InteractionPhaseDropdown } from "../../../shared/components/interaction-phase-dropdown/InteractionPhaseDropdown";
import { InterestLevelDropdown } from "../../../shared/components/interest-level-dropdown/InterestLevelDropdown";
import { ContactStatusDropdown } from "../../../shared/components/contact-status-dropdown/ContactStatusDropdown";
import { useLeads } from "../../../shared/hooks/useLeads";
import { useInteractionPhases } from "../../../shared/hooks/useInteractionPhases";
import { useInterestLevels } from "../../../shared/hooks/useInterestLevels";
import { ContactCard } from "../../../shared/components/contact-card/ContactCard";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LeadsTable } from "./components/LeadsTable";
import { ActivityHistoryModal } from "../../../shared/components/activity-history-modal/ActivityHistoryModal";
import { ContactTracingModal } from "../../../shared/components/contact-tracing-modal/ContactTracingModal";
import CreateTaskModal from "../../../shared/components/create-task-modal/CreateTaskModal";
import { useTasks } from "../../../shared/hooks/useTasks";

// interface AdvisorLeadsProps {
//   leads: Lead[];
//   onLeadClick: (lead: Lead) => void;
// }

const LeadsPage = () => {
  const { user } = useAuth();
  const { leads, handleGetLeads } = useLeads();
  const { isLoading, handleSaveTask } = useTasks();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);

  useEffect(() => {
    if (!leads.length) {
      handleGetLeads(user?.id ?? "");
    }
  }, [user, leads]);

  const handleOpenHistory = (lead: Lead) => {
    setSelectedLead(lead);
    setIsOpenHistoryModal(true);
  };

  const handleOpenView = (lead: Lead) => {
    setSelectedLead(lead);
    setIsOpenViewModal(true);
  };

  const handleTaskCreate = (lead: Lead) => {
    setSelectedLead(lead);
    setIsOpenCreateTask(true);
  };

  return (
    <div className="space-y-6">
      <ActivityHistoryModal
        size="4xl"
        // scrollBehavior="inside"
        isOpen={isOpenHistoryModal}
        contact={selectedLead?.data ?? null}
        onClose={() => setIsOpenHistoryModal(!isOpenHistoryModal)}
      />
      <ContactTracingModal
        size="4xl"
        // scrollBehavior="inside"
        isOpen={isOpenViewModal}
        contact={selectedLead?.data ?? null}
        onClose={() => setIsOpenViewModal(!isOpenViewModal)}
      />
      <CreateTaskModal
        isOpen={isOpenCreateTask}
        isLoading={isLoading}
        advisor={user?.id ?? ""}
        onClose={() => setIsOpenCreateTask(!isOpenCreateTask)}
        onSave={handleSaveTask}
        contacts={
          selectedLead
            ? [
                {
                  id: selectedLead.id,
                  name: selectedLead.data.name,
                  company: selectedLead.data.company,
                },
              ]
            : []
        }
      />
      <h2 className="text-2xl font-bold text-gray-800">Mis Leads</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <InteractionPhaseDropdown value={""} onChange={() => {}} />
        {/* <Select placeholder="Todos los Estados" className="w-48">
          <SelectItem key="Calificar">Calificar</SelectItem>
          <SelectItem key="Desarrollar">Desarrollar</SelectItem>
          <SelectItem key="Proponer">Proponer</SelectItem>
          <SelectItem key="Cierre">Cierre</SelectItem>
        </Select> */}
        <ContactStatusDropdown value={""} onChange={() => {}} />
        <InterestLevelDropdown value={""} onChange={() => {}} />
        {/* <Select placeholder="Todos los Niveles" className="w-48">
          <SelectItem key="Poco interesado">Poco interesado</SelectItem>
          <SelectItem key="Interesado">Interesado</SelectItem>
          <SelectItem key="Medianamente interesado">
            Medianamente interesado
          </SelectItem>
        </Select> */}
      </div>

      {/* Leads Grid */}
      <LeadsTable
        data={leads}
        onDataView={handleOpenView}
        onHistoryView={handleOpenHistory}
        onTaskCreate={handleTaskCreate}
      />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leads?.map((lead) => (
          <ContactCard contact={lead} onClick={onLeadClick} />
          //   <Card
          //     key={lead.id}
          //     shadow="sm"
          //     className="cursor-pointer hover:shadow-md transition-shadow"
          //     onClick={() => onLeadClick(lead)}
          //   >
          //     <CardBody className="p-4">
          //       <div className="flex justify-between items-start mb-2">
          //         <h4 className="font-medium">{lead.data.name}</h4>
          //         <span
          //           className={`text-xs px-2 py-0.5 rounded-full ${
          //             lead.data.interactionPhase === InteractionPhase.GRADE
          //               ? "bg-blue-100 text-blue-700"
          //               : lead.data.interactionPhase === InteractionPhase.DEVELOP
          //               ? "bg-amber-100 text-amber-700"
          //               : lead.data.interactionPhase === InteractionPhase.PROPOSE
          //               ? "bg-purple-100 text-purple-700"
          //               : "bg-green-100 text-green-700"
          //           }`}
          //         >
          //           {getPhaseDescriptionByName(lead.data.interactionPhase)}
          //         </span>
          //       </div>

          //       <div className="space-y-1 text-sm text-gray-600">
          //         <p>
          //           <Icon icon="lucide:phone" className="inline w-4 h-4 mr-1" />
          //           {lead.data.phone}
          //         </p>
          //         <p>
          //           <Icon
          //             icon="lucide:building"
          //             className="inline w-4 h-4 mr-1"
          //           />
          //           {lead.data.company}
          //         </p>
          //         <p>
          //           <Icon icon="lucide:star" className="inline w-4 h-4 mr-1" />
          //           <strong>Nivel de Interes:</strong>{" "}
          //           {getInterestDescriptionByName(lead.data.interestLevel)}
          //         </p>
          //       </div>

          //       <div className="mt-3 pt-3 border-t border-gray-200">
          //         <p className="text-xs text-gray-500">
          //           Última actividad:{" "}
          //           {new Date(lead.data.lastActivity).toLocaleDateString()}
          //         </p>
          //       </div>
          //     </CardBody>
          //   </Card>
        ))}
      </div> */}
    </div>
  );
};

export default LeadsPage;
