import React from "react";
import { Button, Card, CardBody, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import { InteractionPhase } from "../../../../../core/domain/value-objects/contact";
import { InteractionPhaseDropdown } from "../../../shared/components/interaction-phase-dropdown/InteractionPhaseDropdown";
import { ContactStatusDropdown } from "../../../shared/components/contact-status-dropdown/ContactStatusDropdown";
import { InterestLevelDropdown } from "../../../shared/components/interest-level-dropdown/InterestLevelDropdown";
import CreateClientModal from "./components/ModalCreateCliente";

interface AdvisorClientsProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const ClientsPage: React.FC<AdvisorClientsProps> = ({ leads, onLeadClick }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCreateClient = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveClient = (clientData: any) => {
    console.log("Datos del cliente creado:", clientData);
    // Aquí puedes procesar los datos del cliente
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Clientes</h2>
        <Button
          color="primary"
          onPress={handleCreateClient}
          startContent={<Icon icon="lucide:plus" />}
        >
          Nuevo cliente
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <InteractionPhaseDropdown value={""} onChange={() => { }} />
        {/* <Select placeholder="Todos" className="w-48">
          <SelectItem key="Calificar">Calificar</SelectItem>
          <SelectItem key="Desarrollar">Desarrollar</SelectItem>
          <SelectItem key="Proponer">Proponer</SelectItem>
          <SelectItem key="Cierre">Cerrados (Nuestros Clientes)</SelectItem>
        </Select> */}
        <ContactStatusDropdown value={""} onChange={() => { }} />
        {/* <Select placeholder="Todos" className="w-48">
          <SelectItem key="fidelizado">Cliente Fidelizado</SelectItem>
          <SelectItem key="perdido">Cliente Perdido</SelectItem>
        </Select> */}
        <InterestLevelDropdown value={""} onChange={() => { }} />
        {/* <Select placeholder="Todos" className="w-48">
          <SelectItem key="Poco interesado">Poco interesado</SelectItem>
          <SelectItem key="Interesado">Interesado</SelectItem>
          <SelectItem key="Medianamente interesado">
            Medianamente interesado
          </SelectItem>
        </Select> */}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card shadow="sm" className="bg-white">
          <CardBody className="p-4 text-center">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Total Clientes
            </h4>
            <div className="text-2xl font-bold">18</div>
          </CardBody>
        </Card>

        <Card shadow="sm" className="bg-white">
          <CardBody className="p-4 text-center">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Clientes Fidelizados
            </h4>
            <div className="text-2xl font-bold text-green-600">15</div>
          </CardBody>
        </Card>

        <Card shadow="sm" className="bg-white">
          <CardBody className="p-4 text-center">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Clientes Perdidos
            </h4>
            <div className="text-2xl font-bold text-red-600">3</div>
          </CardBody>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads
          ?.filter(
            (lead) => lead.data.interactionPhase === InteractionPhase.CLOSING
          )
          .map((lead) => (
            <Card
              key={lead.id}
              shadow="sm"
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onLeadClick(lead)}
            >
              <CardBody className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{lead.data.name}</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {lead.data.status}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <Icon icon="lucide:phone" className="inline w-4 h-4 mr-1" />
                    {lead.data.phone}
                  </p>
                  <p>
                    <Icon
                      icon="lucide:building"
                      className="inline w-4 h-4 mr-1"
                    />
                    {lead.data.company}
                  </p>
                  <p>
                    <Icon
                      icon="lucide:calendar"
                      className="inline w-4 h-4 mr-1"
                    />
                    Cliente desde:{" "}
                    {new Date(lead.data.lastActivity).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Plan actual: Pendiente
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
      
      {/* Modal para crear nuevo cliente */}
      <CreateClientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default ClientsPage;
