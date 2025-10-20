import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Task } from "../../../../../core/domain/entities/Task";
import { TaskStatus } from "../../../../../core/domain/value-objects/task";
import StatsGrid from "../../../shared/components/stats-grid/StatsGrid";

interface AdvisorDashboardProps {
  tasks: Task[];
}

// Mock data for the dashboard
const mockStats = [
  {
    id: "clients",
    title: "Clientes",
    value: 45,
    change: "+3 esta semana",
    changeType: "positive" as const,
    icon: "lucide:users",
  },
  {
    id: "won-clients",
    title: "Cliente Ganado",
    value: 18,
    change: "+2 esta semana",
    changeType: "positive" as const,
    icon: "lucide:user-check",
  },
  {
    id: "lost-clients",
    title: "Cliente Perdido",
    value: 7,
    changeType: "negative" as const,
    icon: "lucide:user-minus",
  },
  {
    id: "prospect-clients",
    title: "Cliente Prospecto",
    value: 20,
    changeType: "neutral" as const,
    icon: "lucide:user-plus",
  },
  {
    id: "conversion-rate",
    title: "Tasa Conversión",
    value: "40%",
    change: "+5% vs semana anterior",
    changeType: "positive" as const,
    icon: "lucide:percent",
  },
  {
    id: "completed-tasks",
    title: "Tareas Completadas",
    value: 32,
    change: "+12 esta semana",
    changeType: "positive" as const,
    icon: "lucide:check-circle",
  },
  {
    id: "pending-tasks",
    title: "Tareas Pendientes Hoy",
    value: 5,
    changeType: "neutral" as const,
    icon: "lucide:clock",
  },
  {
    id: "overdue-tasks",
    title: "Tareas Atrasadas Sin Gestión",
    value: 0,
    changeType: "negative" as const,
    icon: "lucide:alert-triangle",
  },
];

const DashboardPage: React.FC<AdvisorDashboardProps> = ({ tasks }) => {
  // Calculate overdue tasks without management
  const overdueUnmanagedTasks = tasks?.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now && task.status === TaskStatus.OPENED;
  });

  // Update the stats with calculated value
  const updatedStats = mockStats.map((stat) =>
    stat.id === "overdue-tasks"
      ? { ...stat, value: overdueUnmanagedTasks?.length }
      : stat
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        Mi Dashboard
      </h2>

      <StatsGrid stats={updatedStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardBody className="p-3 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Próximas Tareas
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {tasks?.length > 0 ? (
                tasks.slice(0, 5).map((task) => {
                  const dueDate = new Date(task.dueDate);
                  const isToday =
                    dueDate.toDateString() === new Date().toDateString();
                  const isTomorrow =
                    dueDate.toDateString() ===
                    new Date(Date.now() + 86400000).toDateString();
                  const timeString = dueDate.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const dateString = isToday
                    ? "Hoy"
                    : isTomorrow
                    ? "Mañana"
                    : dueDate.toLocaleDateString("es-ES", { weekday: "long" });

                  const getTaskIcon = (type: string) => {
                    switch (type) {
                      case "Llamada":
                        return "lucide:phone";
                      case "Mensaje":
                        return "lucide:message-circle";
                      case "Correo":
                        return "lucide:mail";
                      case "Reunión presencial":
                        return "lucide:users";
                      default:
                        return "lucide:check-square";
                    }
                  };

                  const getTaskColor = (type: string) => {
                    switch (type) {
                      case "Llamada":
                        return "bg-blue-50 border-blue-100 bg-blue-100 text-blue-600";
                      case "Mensaje":
                        return "bg-green-50 border-green-100 bg-green-100 text-green-600";
                      case "Correo":
                        return "bg-purple-50 border-purple-100 bg-purple-100 text-purple-600";
                      case "Reunión presencial":
                        return "bg-amber-50 border-amber-100 bg-amber-100 text-amber-600";
                      default:
                        return "bg-gray-50 border-gray-100 bg-gray-100 text-gray-600";
                    }
                  };

                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case "abierto":
                        return "bg-blue-100 text-blue-700";
                      case "programada":
                        return "bg-amber-100 text-amber-700";
                      case "completada":
                        return "bg-green-100 text-green-700";
                      case "cerrada":
                        return "bg-red-100 text-red-700";
                      default:
                        return "bg-gray-100 text-gray-700";
                    }
                  };

                  return (
                    <div
                      key={task.id}
                      className={`p-2 sm:p-3 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 ${getTaskColor(
                        task.type
                      )}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="p-1.5 sm:p-2 rounded-full flex-shrink-0">
                          <Icon
                            icon={getTaskIcon(task.type)}
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base truncate">
                            {task.type} con {task.advisor}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">
                            {dateString}, {timeString}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status === TaskStatus.OPENED
                          ? "Pendiente"
                          : task.status === TaskStatus.PROGRAMED
                          ? "Programada"
                          : task.status === TaskStatus.COMPLETED
                          ? "Completada"
                          : "Cerrada"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No hay tareas pendientes
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-3 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Secuencias Asignadas
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="font-medium text-sm sm:text-base">
                    Secuencia de Calificación
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap self-start">
                    Activa
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  3 pasos • 5 leads asignados
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-gray-500">
                  <span>Creada: 10/05/2023</span>
                  <span>Progreso: 60%</span>
                </div>
              </div>

              <div className="p-2 sm:p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="font-medium text-sm sm:text-base">
                    Secuencia de Desarrollo
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap self-start">
                    Activa
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  5 pasos • 3 leads asignados
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-gray-500">
                  <span>Creada: 05/05/2023</span>
                  <span>Progreso: 40%</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
