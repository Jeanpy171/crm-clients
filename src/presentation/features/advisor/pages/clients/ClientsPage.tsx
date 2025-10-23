import { Button, Card, CardBody } from "@heroui/react";
import { InteractionPhaseDropdown } from "../../../shared/components/interaction-phase-dropdown/InteractionPhaseDropdown";
import { ContactStatusDropdown } from "../../../shared/components/contact-status-dropdown/ContactStatusDropdown";
import { InterestLevelDropdown } from "../../../shared/components/interest-level-dropdown/InterestLevelDropdown";
import { useClients } from "../../../shared/hooks/useClients";
import type { Client } from "../../../../../core/domain/entities/Client";
import { ClientsTable } from "./components/ClientsTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { ActivityHistoryModal } from "../../../shared/components/activity-history-modal/ActivityHistoryModal";
import { Icon } from "@iconify/react";
import CreateClientModal from "./components/ModalCreateCliente";
import {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../../../../../core/domain/value-objects/contact";
import type { ClientDTO } from "../../../../../core/application/dtos/clients/ClientDTO";
import type { Contact } from "../../../../../core/domain/entities/Contact";

const ClientsPage = () => {
  const {
    clients,
    handleGetClients,
    handleSaveClient: saveClient,
  } = useClients();
  const { user } = useAuth();
  const [selectedClient, setSelectedClient] = useState<Contact | null>(null);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [isOpenCreateClient, setIsOpenCreateClient] = useState(false);

  // useEffect(() => {
  //   if (!clients.length) {
  //     handleGetClients(user?.id ?? "");
  //   }
  // }, [user, clients]);

  const handleOpenHistory = (client: Contact) => {
    setSelectedClient(client);
    setIsOpenHistoryModal(true);
  };

  const handleSaveClient = async (clientData: any) => {
    console.log("Datos del cliente creado:", clientData);
    console.log("User ID actual:", user?.id);

    try {
      // Map form data to ClientDTO
      const clientDTO: Omit<ClientDTO, "history"> = {
        id: `client_${Date.now()}`, // Generate unique ID
        name: clientData.name,
        company:
          clientData.currentProvider ||
          clientData.currentCompany ||
          "Sin empresa",
        email: clientData.email || "", // Default empty email
        phone: clientData.phone,
        interactionPhase: InteractionPhase.GRADE, // Default for clients
        interestLevel: clientData.interestLevel || InterestLevel.INTEREST,
        status: ContactStatus.PROSPECT, // Default status for clients
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        followUpNotes: clientData.whatsMissing || "",
        advisor: user?.id || "",
      };

      console.log("ClientDTO a guardar:", clientDTO);

      await saveClient(clientDTO);
      console.log("Cliente guardado exitosamente, cerrando modal");
      setIsOpenCreateClient(false);

      // Refresh clients list to ensure it's updated
      console.log("Refrescando lista de clientes con advisor ID:", user?.id);
      handleGetClients(user?.id ?? "");
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
  };

  return (
    <div className="space-y-6">
      <ActivityHistoryModal
        size="4xl"
        // scrollBehavior="inside"
        isOpen={isOpenHistoryModal}
        contact={selectedClient ?? null}
        onClose={() => setIsOpenHistoryModal(!isOpenHistoryModal)}
      />
      <CreateClientModal
        isOpen={isOpenCreateClient}
        onClose={() => setIsOpenCreateClient(!isOpenCreateClient)}
        onSave={handleSaveClient}
      />

      {/* <ContactTracingModal
        size="4xl"
        // scrollBehavior="inside"
        isOpen={isOpenDetailModal}
        contact={selectedClient?.data ?? null}
        onClose={() => setIsOpenDetailModal(!isOpenDetailModal)}
      /> */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Clientes</h2>
        <Button
          color="primary"
          onPress={() => setIsOpenCreateClient(true)}
          startContent={<Icon icon="lucide:plus" />}
        >
          Nuevo cliente
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <InteractionPhaseDropdown value={""} onChange={() => {}} />
        {/* <Select placeholder="Todos" className="w-48">
          <SelectItem key="Calificar">Calificar</SelectItem>
          <SelectItem key="Desarrollar">Desarrollar</SelectItem>
          <SelectItem key="Proponer">Proponer</SelectItem>
          <SelectItem key="Cierre">Cerrados (Nuestros Clientes)</SelectItem>
        </Select> */}
        <ContactStatusDropdown value={""} onChange={() => {}} />
        {/* <Select placeholder="Todos" className="w-48">
          <SelectItem key="fidelizado">Cliente Fidelizado</SelectItem>
          <SelectItem key="perdido">Cliente Perdido</SelectItem>
        </Select> */}
        <InterestLevelDropdown value={""} onChange={() => {}} />
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

      <ClientsTable data={clients} onHistoryView={handleOpenHistory} />
    </div>
  );
};

export default ClientsPage;
