import { useEffect, useState } from "react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { Column } from "./Column";
import { useLeads } from "../../../../shared/hooks/useLeads";
import { useClients } from "../../../../shared/hooks/useClients";
import { InteractionPhase } from "../../../../../../core/domain/value-objects/contact";
import { addToast } from "@heroui/react";
import { ContactTracingModal } from "../../../../shared/components/contact-tracing-modal/ContactTracingModal";

export interface ColumnType {
  id: string;
  title: string;
  //   phase: InteractionPhase;
  contacts: Contact[];
}

export const Board = () => {
  // const { user } = useAuth();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const { leads } = useLeads();
  const { clients } = useClients();
  const [dragState, setDragState] = useState<{
    originColumnId: string | null;
    isDragging: boolean;
  }>({ originColumnId: null, isDragging: false });
  const [isShowContactData, setIsShowContactData] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDragStart = (columnId: string) => {
    setDragState({ originColumnId: columnId, isDragging: true });
  };

  const handleDragEnd = () => {
    setDragState({ originColumnId: null, isDragging: false });
  };

  // useEffect(() => {
  //   if (!clients.length) {
  //     handleGetClients(user?.id ?? "");
  //   }
  // }, [user, clients]);

  // useEffect(() => {
  //   if (!leads.length) {
  //     handleGetLeads(user?.id ?? "");
  //   }
  // }, [user, leads]);

  useEffect(() => {
    handleSortByColumn();
  }, [leads, clients]);

  const handleDrop = (id: string, targetColumnId: string) => {
    let movingContact: Contact | null = null;
    let columnName: string | null = null;

    setColumns((prev) => {
      const sourceCol = prev.find((col) =>
        col.contacts.some((c) => c.id === id)
      );
      if (!sourceCol) return prev;

      movingContact = sourceCol.contacts.find((c) => c.id === id)!;

      const withoutSource = prev.map((col) =>
        col.id === sourceCol.id
          ? { ...col, contacts: col.contacts.filter((c) => c.id !== id) }
          : col
      );

      const updated = withoutSource.map((col) => {
        if (col.id === targetColumnId && movingContact) {
          columnName = col.title;
          return { ...col, contacts: [...col.contacts, movingContact] };
        }
        return col;
      });

      return updated;
    });

    if (movingContact) {
      addToast({
        title: `Contacto movido a etapa ${columnName}`,
        description: `El cliente ${movingContact.name} se ha desplazado correctamente`,
        color: "success",
        timeout: 2500,
      });
    }

    handleDragEnd();
  };

  const handleSortByColumn = () => {
    const mixedContacts = [...clients, ...leads];
    // const formattedContacts = mixedContacts.map((contact) => ({
    //   id: contact.id,
    //   ...contact.data,
    // }));

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

  return (
    <div className="flex gap-4 min-h-screen justify-between items-start">
      <ContactTracingModal
        size="4xl"
        contact={selectedContact}
        isOpen={isShowContactData}
        onClose={() => setIsShowContactData(false)}
      />
      {columns.map((col) => (
        <Column
          key={col.id}
          column={col}
          onDrop={handleDrop}
          dragState={{
            ...dragState,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
          }}
          onViewContactData={handleViewContactData}
        />
      ))}
    </div>
  );
};
