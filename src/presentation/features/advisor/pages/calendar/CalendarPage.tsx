import React from "react";
import type { Task } from "../../../../../core/domain/entities/Task";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import WeeklyCalendar from "./components/WeeklyCalendar";

interface AdvisorCalendarProps {
  tasks: Task[];
  leads: Lead[];
}

const CalendarPage: React.FC<AdvisorCalendarProps> = ({ tasks, leads }) => {
  // Convert tasks to calendar events
  const events = tasks?.map((task) => {
    const lead = leads?.find((l) => l.id === task.leadId);
    const dueDate = new Date(task.dueDate);
    const dateStr = dueDate.toISOString().split("T")[0];
    const timeStr = dueDate.toTimeString().slice(0, 5);

    const getEventType = (
      taskType: string
    ): "meeting" | "call" | "task" | "reminder" => {
      switch (taskType) {
        case "Llamada":
          return "call";
        case "Mensaje":
          return "reminder";
        case "Correo":
          return "reminder";
        case "Reunión presencial":
          return "meeting";
        default:
          return "task";
      }
    };

    return {
      id: task.id,
      title: `${task.type} con ${lead?.name || "Cliente"}`,
      date: dateStr,
      time: timeStr,
      duration: task.duration,
      type: getEventType(task.type),
      advisor: task.advisor,
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mi Calendario</h2>

      <WeeklyCalendar
        events={events}
        onEventClick={(event) => {
          console.log("Event clicked:", event);
        }}
        showCreateButton={false}
      />
    </div>
  );
};

export default CalendarPage;
