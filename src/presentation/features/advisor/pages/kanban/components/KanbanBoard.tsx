import { useEffect, useState } from "react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { KanbanColumn } from "./KanbanColumn";
import { useLeads } from "../../../../shared/hooks/useLeads";
import { useClients } from "../../../../shared/hooks/useClients";
import {
  ContactStatus,
  InteractionPhase,
} from "../../../../../../core/domain/value-objects/contact";
import { addToast } from "@heroui/react";
import { ContactTracingModal } from "../../../../shared/components/contact-tracing-modal/ContactTracingModal";
import { container } from "../../../../../../config/di-container";
import type { HistoryDTO } from "../../../../../../core/application/dtos/contact/HistoryDTO";
import { RatingContactModal } from "./RatingContactModal";

export interface ColumnType {
  id: string;
  title: string;
  //   phase: InteractionPhase;
  contacts: Contact[];
}

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const { leads, handleUpdateLead } = useLeads();
  const { clients, handleUpdateClient } = useClients();
  const [dragState, setDragState] = useState<{
    originColumnId: string | null;
    isDragging: boolean;
  }>({ originColumnId: null, isDragging: false });
  const [isShowContactData, setIsShowContactData] = useState(false);
  const [isRatingContact, setIsRatingContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDragStart = (columnId: string) => {
    setDragState({ originColumnId: columnId, isDragging: true });
  };

  const handleDragEnd = () => {
    setDragState({ originColumnId: null, isDragging: false });
  };

  useEffect(() => {
    handleSortByColumn();
  }, [leads, clients]);

  const handleDrop = async (id: string, targetColumnId: string) => {
    const prev = columns;

    const sourceCol = prev.find((col) => col.contacts.some((c) => c.id === id));
    if (!sourceCol) return;

    if (sourceCol.id === targetColumnId) {
      handleDragEnd();
      return;
    }

    const movingContact = sourceCol.contacts.find((c) => c.id === id);
    if (!movingContact) {
      handleDragEnd();
      return;
    }

    const targetCol = prev.find((col) => col.id === targetColumnId);
    if (!targetCol) {
      handleDragEnd();
      return;
    }

    const updatedColumns = prev.map((col) => {
      if (col.id === sourceCol.id) {
        return {
          ...col,
          contacts: col.contacts.filter((c) => c.id !== id),
        };
      }
      if (col.id === targetCol.id) {
        return {
          ...col,
          contacts: [...col.contacts, movingContact],
        };
      }
      return col;
    });

    setColumns(updatedColumns);

    addToast({
      title: `Contacto movido a etapa ${targetCol.title}`,
      description: `El cliente ${movingContact.name} se ha desplazado correctamente`,
      color: "success",
      timeout: 2500,
    });

    try {
      const history: HistoryDTO = {
        id: crypto?.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
        action: "UPDATE",
        createdAt: new Date(),
        idContact: movingContact.id,
        newInteractionPhase: targetCol.id as InteractionPhase,
        pastInteractionPhase: movingContact.interactionPhase,
        type: "CLIENT",
      };

      const newHistory = await container.saveHistoryUseCase.execute(history);
      console.warn("HISTORICO: ", movingContact.history);

      movingContact.setHistory([...(movingContact.history || []), newHistory]);

      movingContact.interactionPhase = targetCol.id as InteractionPhase;
    } catch (error) {
      console.error("Error registrando el movimiento:", error);
      addToast({
        title: "Error al registrar movimiento",
        description: "No se pudo registrar el cambio de etapa.",
        color: "danger",
        timeout: 3000,
      });
    }

    handleDragEnd();
  };

  const handleSortByColumn = () => {
    const mixedContacts = [...clients, ...leads];

    const filterByGrades =
      mixedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.GRADE
      ) || [];

    const filterByDevelop =
      mixedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.DEVELOP
      ) || [];

    const filterByPropose =
      mixedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.PROPOSE
      ) || [];

    const filterByClosing =
      mixedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.CLOSING
      ) || [];

    const dataByColums: ColumnType[] = [
      {
        id: InteractionPhase.GRADE,
        title: "Calificar",
        contacts: filterByGrades,
      },
      {
        id: InteractionPhase.DEVELOP,
        title: "Desarrollar",
        contacts: filterByDevelop,
      },
      {
        id: InteractionPhase.PROPOSE,
        title: "Proponer",
        contacts: filterByPropose,
      },
      {
        id: InteractionPhase.CLOSING,
        title: "Cerrar",
        contacts: filterByClosing,
      },
    ];

    setColumns(dataByColums);
  };

  const handleViewContactData = (contact: Contact | null) => {
    setSelectedContact(contact);
    setIsShowContactData(true);
  };

  const handleViewRatingContact = (contact: Contact | null) => {
    setSelectedContact(contact);
    setIsRatingContact(true);
  };

  const maxColumnHeight = Math.max(
    ...columns.map((c) => c.contacts.length * 100 + 100)
  );

  return (
    <div className="flex gap-4 min-h-screen justify-between items-start">
      <ContactTracingModal
        size="4xl"
        contact={selectedContact}
        isOpen={isShowContactData}
        onClose={() => setIsShowContactData(false)}
      />
      <RatingContactModal
        size="3xl"
        name={selectedContact?.name || ""}
        company={selectedContact?.company || ""}
        isOpen={isRatingContact}
        onClose={() => setIsRatingContact(false)}
        onSuccess={() => {
          selectedContact?.setStatus(ContactStatus.LOYAL);
          selectedContact?.setInteractionPhase(InteractionPhase.CLOSING);
          if (selectedContact?.type === "CLIENT") {
            handleUpdateClient({
              id: selectedContact.id,
              status: ContactStatus.LOYAL,
              interactionPhase: InteractionPhase.CLOSING,
            });
          } else {
            handleUpdateLead({
              id: selectedContact?.id || "",
              status: ContactStatus.LOYAL,
              interactionPhase: InteractionPhase.CLOSING,
            });
          }
          setIsRatingContact(false);
        }}
        onFailed={() => {
          selectedContact?.setStatus(ContactStatus.LOST);
          setIsRatingContact(false);
        }}
      />
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          onDrop={handleDrop}
          dragState={{
            ...dragState,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
          }}
          onViewContactData={handleViewContactData}
          onRatingContact={handleViewRatingContact}
          columnHeight={maxColumnHeight}
        />
      ))}
    </div>
  );
};
