import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import StatsGrid from "../../../shared/components/stats-grid/StatsGrid";
// import { Task } from "../../types/task";

interface AdvisorDashboardProps {
  //tasks: Task[];
  tasks: any[];
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
];

const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({ tasks }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mi Dashboard</h2>

      <StatsGrid stats={mockStats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-5">
            <h3 className="text-lg font-semibold mb-4">Próximas Tareas</h3>
            <div className="space-y-3">
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
                      case "cancelada":
                        return "bg-red-100 text-red-700";
                      default:
                        return "bg-gray-100 text-gray-700";
                    }
                  };

                  return (
                    <div
                      key={task.id}
                      className={`p-3 rounded-md border flex items-center justify-between ${getTaskColor(
                        task.type
                      )}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full">
                          <Icon icon={getTaskIcon(task.type)} />
                        </div>
                        <div>
                          <p className="font-medium">
                            {task.type} con {task.advisor}
                          </p>
                          <p className="text-sm text-gray-500">
                            {dateString}, {timeString}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status === "abierto"
                          ? "Pendiente"
                          : task.status === "programada"
                          ? "Programada"
                          : task.status === "completada"
                          ? "Completada"
                          : "Cancelada"}
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
          <CardBody className="p-5">
            <h3 className="text-lg font-semibold mb-4">Secuencias Asignadas</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Secuencia de Calificación</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Activa
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  3 pasos • 5 leads asignados
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Creada: 10/05/2023</span>
                  <span>Progreso: 60%</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Secuencia de Desarrollo</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Activa
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  5 pasos • 3 leads asignados
                </p>
                <div className="flex justify-between text-xs text-gray-500">
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

export default AdvisorDashboard;
