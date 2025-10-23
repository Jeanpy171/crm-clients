import React, { useState, useEffect } from "react";
import WeeklyCalendar from "./components/WeeklyCalendar";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from "@heroui/react";
import { useTasks } from "../../../shared/hooks/useTasks";
import { useLeads } from "../../../shared/hooks/useLeads";
import { useAuth } from "../../../shared/hooks/useAuth";

const CalendarPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks para obtener datos
  const { user } = useAuth();
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { leads, handleGetLeads } = useLeads();

  // Cargar leads cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id && leads.length === 0) {
      handleGetLeads(user.id);
    }
  }, [user, leads.length, handleGetLeads]);

  // Debug logs para verificar datos
  console.log("CalendarPage - Tasks:", tasks);
  console.log("CalendarPage - Leads:", leads);
  console.log("CalendarPage - Tasks loading:", tasksLoading);

  // Convert tasks to calendar events
  const events = tasks?.map((task) => {
    const lead = leads?.find((l) => l.id === task.leadId);
    const dueDate = new Date(task.dueDate);
    
    // Usar métodos locales en lugar de UTC para evitar problemas de zona horaria
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(dueDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const hours = String(dueDate.getHours()).padStart(2, '0');
    const minutes = String(dueDate.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    // Debug logs para fechas
    console.log(`Task ${task.id} - Original dueDate: ${task.dueDate}`);
    console.log(`Task ${task.id} - Processed dueDate: ${dueDate}`);
    console.log(`Task ${task.id} - Date string: ${dateStr}`);
    console.log(`Task ${task.id} - Time string: ${timeStr}`);

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
      title: `${task.type} con ${lead?.data.name || "Cliente"}`,
      date: dateStr,
      time: timeStr,
      duration: task.duration,
      type: getEventType(task.type),
      advisor: task.advisor,
      // Información adicional de la tarea
      task: task,
      lead: lead,
      priority: task.priority,
      status: task.status,
      notes: task.notes,
    };
  });

  // Debug logs para eventos
  console.log("CalendarPage - Events generated:", events);
  console.log("CalendarPage - Events count:", events?.length);

  // Mostrar estado de carga
  if (tasksLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Mi Calendario</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando calendario...</div>
        </div>
      </div>
    );
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "ALTA":
        return "danger";
      case "MEDIA":
        return "warning";
      case "BAJA":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETADA":
        return "success";
      case "PENDIENTE":
        return "warning";
      case "EN_PROGRESO":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mi Calendario</h2>

      <WeeklyCalendar
        events={events}
        onEventClick={handleEventClick}
        showCreateButton={false}
      />

      {/* Modal de detalles de la tarea */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">Detalles de la Tarea</h3>
          </ModalHeader>
          <ModalBody>
            {selectedEvent && (
              <div className="space-y-4">
                {/* Información de la tarea */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tipo</label>
                    <p className="text-sm">{selectedEvent.task?.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <Chip size="sm" color={getStatusColor(selectedEvent.status)} variant="flat">
                      {selectedEvent.status}
                    </Chip>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Vencimiento</label>
                    <p className="text-sm">{new Date(selectedEvent.task?.dueDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Duración (min)</label>
                    <p className="text-sm">{selectedEvent.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Prioridad</label>
                    <Chip size="sm" color={getPriorityColor(selectedEvent.priority)} variant="flat">
                      {selectedEvent.priority}
                    </Chip>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Asesor</label>
                    <p className="text-sm">{selectedEvent.advisor || "No asignado"}</p>
                  </div>
                </div>

                {/* Notas */}
                {selectedEvent.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Notas</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedEvent.notes}</p>
                  </div>
                )}

                {/* Información del Lead */}
                {selectedEvent.lead && (
                  <div className="border-t pt-4">
                    <h4 className="text-md font-semibold mb-2">Información del Lead</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Nombre</label>
                        <p className="text-sm">{selectedEvent.lead.data.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Teléfono</label>
                        <p className="text-sm">{selectedEvent.lead.data.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-sm">{selectedEvent.lead.data.email || "No disponible"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Nivel de Interés</label>
                        <p className="text-sm">{selectedEvent.lead.data.interestLevel}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarPage;
