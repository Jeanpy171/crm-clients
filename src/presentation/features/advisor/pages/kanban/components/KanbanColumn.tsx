import React, { useState, useRef } from "react";
import type { ColumnType } from "./KanbanBoard";
import type { Contact } from "../../../../../../core/domain/entities/Contact";
import { Divider } from "@heroui/react";
import { KanbanCard } from "./KanbanCard";

interface ColumnProps {
  column: ColumnType;
  onDrop: (taskId: string, targetColumnId: string) => void;
  onViewContactData: (contact: Contact | null) => void;
  onRatingContact: (contact: Contact | null) => void;
  dragState?: {
    originColumnId: string | null;
    isDragging: boolean;
    onDragStart: (columnId: string) => void;
    onDragEnd?: () => void;
  };
  columnHeight: number;
}

export const KanbanColumn = ({
  column,
  dragState,
  columnHeight,
  onDrop,
  onRatingContact,
  onViewContactData,
}: ColumnProps) => {
  const [isOver, setIsOver] = useState(false);
  const dragCounter = useRef(0);

  const originColumnId = dragState?.originColumnId ?? null;
  const isDragging = dragState?.isDragging ?? false;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (column.id !== originColumnId) {
      dragCounter.current += 1;
      setIsOver(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    dragCounter.current = 0;
    setIsOver(false);
    onDrop(taskId, column.id);
  };

  const borderClass =
    isOver && column.id !== originColumnId
      ? "border-blue-500"
      : isDragging && column.id !== originColumnId
      ? "border-blue-300 border-dashed"
      : "border-gray-200";

  const bgClass = isOver && column.id !== originColumnId ? "bg-blue-50" : "";

  return (
    <div
      className={`flex flex-col w-80 gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ease-in-out ${borderClass} ${bgClass}`}
      style={{ minHeight: columnHeight }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <div className="bg-blue-800 text-white font-bold rounded-full w-6 h-6 flex justify-center items-center">
          <h5>{column.contacts.length}</h5>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2 flex-1">
        {column.contacts.map((contact) => (
          <KanbanCard
            key={contact.id}
            contact={contact}
            columnId={column.id}
            onRatingContact={onRatingContact}
            onViewContactData={onViewContactData}
            onDragStart={dragState?.onDragStart}
            onDragEnd={dragState?.onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
