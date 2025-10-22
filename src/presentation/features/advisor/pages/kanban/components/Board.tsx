import { useEffect, useState } from "react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { Column } from "./Column";
import { useLeads } from "../../../../shared/hooks/useLeads";
import { useClients } from "../../../../shared/hooks/useClients";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { InteractionPhase } from "../../../../../../core/domain/value-objects/contact";

export interface ColumnType {
  id: string;
  title: string;
  //   phase: InteractionPhase;
  contacts: ({ id: string } & Contact)[];
}

export const Board = () => {
  const { user } = useAuth();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const { leads, handleGetLeads } = useLeads();
  const { clients, handleGetClients } = useClients();
  const [dragState, setDragState] = useState<{
    originColumnId: string | null;
    isDragging: boolean;
  }>({ originColumnId: null, isDragging: false });

  const handleDragStart = (columnId: string) => {
    setDragState({ originColumnId: columnId, isDragging: true });
  };

  const handleDragEnd = () => {
    setDragState({ originColumnId: null, isDragging: false });
  };

  useEffect(() => {
    if (!clients.length) {
      handleGetClients(user?.id ?? "");
    }
  }, [user, clients]);

  useEffect(() => {
    if (!leads.length) {
      handleGetLeads(user?.id ?? "");
    }
  }, [user, leads]);

  useEffect(() => {
    handleSortByColumn();
  }, [leads, clients]);

  const handleDrop = (id: string, targetColumnId: string) => {
    setColumns((prev) => {
      let movingContact: ({ id: string } & Contact) | null = null;

      const updated = prev.map((col) => {
        if (col.contacts.find((c) => c.id === id)) {
          movingContact = col.contacts.find((t) => t.id === id)!;
          return { ...col, contacts: col.contacts.filter((t) => t.id !== id) };
        }
        return col;
      });

      return updated.map((col) => {
        if (col.id === targetColumnId && movingContact) {
          return { ...col, contacts: [...col.contacts, movingContact] };
        }
        return col;
      });
    });

    handleDragEnd();
  };

  const handleSortByColumn = () => {
    const mixedContacts = [...clients, ...leads];
    const formattedContacts = mixedContacts.map((contact) => ({
      id: contact.id,
      ...contact.data,
    }));

    const filterByGrades =
      formattedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.GRADE
      ) || [];

    const filterByDevelop =
      formattedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.DEVELOP
      ) || [];

    const filterByPropose =
      formattedContacts.filter(
        (contact) => contact.interactionPhase === InteractionPhase.PROPOSE
      ) || [];

    const filterByClosing =
      formattedContacts.filter(
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

  return (
    <div className="flex gap-4 min-h-screen justify-between items-start">
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
        />
      ))}
    </div>
  );
};
