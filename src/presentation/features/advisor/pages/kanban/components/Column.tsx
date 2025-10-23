import React, { useState, useRef } from "react";
import { TaskCard } from "./TaskCard";
import type { ColumnType } from "./Board";
import { Badge, Divider } from "@heroui/react";
import type { Contact } from "../../../../../../core/domain/entities/Contact";

interface ColumnProps {
  column: ColumnType;
  onDrop: (taskId: string, targetColumnId: string) => void;
  onViewContactData: (
    arg0: Contact | null
  ) => void;
  dragState?: {
    originColumnId: string | null;
    isDragging: boolean;
    onDragStart: (columnId: string) => void;
    onDragEnd?: () => void;
  };
}

export const Column = ({
  column,
  onDrop,
  dragState,
  onViewContactData,
}: ColumnProps) => {
  const [isOver, setIsOver] = useState(false);
  const dragCounter = useRef(0);

  const originColumnId = dragState?.originColumnId ?? null;
  const isDragging = dragState?.isDragging ?? false;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Solo aplica si no es la columna de origen
    if (column.id !== originColumnId) {
      dragCounter.current += 1;
      setIsOver(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = e.dataTransfer.getData("text/plain");
    dragCounter.current = 0;
    setIsOver(false);
    onDrop(taskId, column.id);
  };

  // 🔹 Estilos visuales
  let borderClass = "border-gray-200";
  let bgClass = "";

  if (isDragging && column.id !== originColumnId) {
    borderClass = "border-blue-300 border-dashed";
  }

  if (isOver && column.id !== originColumnId) {
    borderClass = "border-blue-500";
    bgClass = "bg-blue-50";
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-80 gap-3 p-4 rounded-2xl min-h-[300px] border-2 transition-all duration-200 ease-in-out ${borderClass} ${bgClass}`}
    >
      <div className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <div className="bg-blue-800 text-white font-bold rounded-full w-6 h-6 flex justify-center items-center">
          <h5>{column?.contacts?.length || 0}</h5>
        </div>
      </div>

      <Divider />
      <div className="flex flex-col gap-2">
        {column.contacts.map((contact) => (
          <TaskCard
            key={contact.id}
            contact={contact}
            columnId={column.id}
            onViewContactData={onViewContactData}
            onDragStart={dragState?.onDragStart}
            onDragEnd={dragState?.onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
