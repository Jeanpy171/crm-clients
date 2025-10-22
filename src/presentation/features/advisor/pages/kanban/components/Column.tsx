import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import type { ColumnType } from "./Board";
import { Divider } from "@heroui/react";

interface ColumnProps {
  column: ColumnType;
  onDrop: (taskId: string, targetColumnId: string) => void;
  dragState?: {
    originColumnId: string | null;
    isDragging: boolean;
    onDragStart: () => void;
    onDragEnd?: () => void;
  }; // opcional
}

export const Column = ({ column, onDrop, dragState }: ColumnProps) => {
  const [isOver, setIsOver] = useState(false);

  const originColumnId = dragState?.originColumnId ?? null;
  const isDragging = dragState?.isDragging ?? false;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggingId = e.dataTransfer.getData("text/plain");
    if (!column.contacts.some((c) => c.id === draggingId)) {
      setIsOver(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();
  const handleDragLeave = () => setIsOver(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    setIsOver(false);
    onDrop(taskId, column.id);
  };

  // 🔹 Determinar borde
  let borderClass = "border-gray-200"; // normal
  if (isDragging && column.id !== originColumnId) {
    borderClass = "border-blue-300 border-dashed"; // todas las columnas excepto la de origen
  }
  if (isOver) {
    borderClass = "border-blue-500 bg-blue-50"; // columna destino
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-80 gap-3 p-4 rounded-2xl min-h-[300px] border-2 transition-all duration-200 ${borderClass}`}
    >
      <h2 className="font-semibold text-gray-700">{column.title}</h2>
      <Divider />
      <div className="flex flex-col gap-2">
        {column.contacts.map((contact) => (
          <TaskCard
            key={contact.id}
            contact={contact}
            columnId={column.id}
            onDragStart={dragState?.onDragStart}
            onDragEnd={dragState?.onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
