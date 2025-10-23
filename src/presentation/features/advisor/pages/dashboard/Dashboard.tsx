import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TaskStatus } from "../../../../../core/domain/value-objects/task";
import StatsGrid from "../../../shared/components/stats-grid/StatsGrid";
import { useTasks } from "../../../shared/hooks/useTasks";

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

const DashboardPage: React.FC = () => {
  // Hooks para obtener datos
  const { tasks, isLoading } = useTasks();

  // Debug logs para verificar datos
  console.log("Dashboard - Tasks:", tasks);
  console.log("Dashboard - Tasks loading:", isLoading);

  // Filter active and scheduled tasks
  const activeTasks = tasks?.filter((task) =>
    task.status === TaskStatus.OPENED || task.status === TaskStatus.PROGRAMED
  ) || [];

  // Debug log para tareas activas
  console.log("Dashboard - Active tasks:", activeTasks);
  console.log("Dashboard - Active tasks count:", activeTasks.length);

  // Calculate overdue tasks without management (considering both date and time)
  const overdueUnmanagedTasks = activeTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    
    // Comparar fecha y hora completas
    const isOverdue = dueDate < now;
    const isOpenStatus = task.status === TaskStatus.OPENED;
    
    // Debug log para cada tarea
    console.log(`Task ${task.id} - Due: ${dueDate.toLocaleString()}, Now: ${now.toLocaleString()}, Is Overdue: ${isOverdue}, Status: ${task.status}, Is Open: ${isOpenStatus}`);
    
    return isOverdue && isOpenStatus;
  });

  // Debug log para tareas atrasadas
  console.log("Dashboard - Overdue tasks:", overdueUnmanagedTasks);
  console.log("Dashboard - Overdue tasks count:", overdueUnmanagedTasks.length);

  // Combinar todas las tareas en una sola lista
  const allTasks = [...activeTasks];
  console.log("Dashboard - All tasks combined:", allTasks);
  console.log("Dashboard - All tasks count:", allTasks.length);

  // Update the stats with calculated values
  const updatedStats = mockStats.map((stat) => {
    switch (stat.id) {
      case "overdue-tasks":
        return { ...stat, value: overdueUnmanagedTasks?.length };
      case "pending-tasks":
        return { ...stat, value: activeTasks?.length };
      case "completed-tasks":
        const completedTasks = tasks?.filter((task) => task.status === TaskStatus.COMPLETED) || [];
        return { ...stat, value: completedTasks.length };
      default:
        return stat;
    }
  });

  // Debug log para estadísticas actualizadas
  console.log("Dashboard - Updated stats:", updatedStats);

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Mi Dashboard
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

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
              Tareas
            </h3>
            <div className="space-y-3">
              {allTasks?.length > 0 ? (
                allTasks.slice(0, 5).map((task) => {
                  const dueDate = new Date(task.dueDate);
                  const now = new Date();
                  const isOverdue = dueDate < now && task.status === TaskStatus.OPENED;
                  
                  const isToday =
                    dueDate.toDateString() === new Date().toDateString();
                  const isTomorrow =
                    dueDate.toDateString() ===
                    new Date(Date.now() + 86400000).toDateString();
                  const timeString = dueDate.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  
                  const dateString = isOverdue
                    ? `Vencida: ${dueDate.toLocaleDateString("es-ES", { 
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}, ${timeString}`
                    : isToday
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

                  const getTaskCardStyle = (type: string, isOverdue: boolean) => {
                    // Si está atrasada, usar formato rojo
                    if (isOverdue) {
                      return {
                        bg: "bg-red-100",
                        text: "text-red-800",
                        icon: "text-red-600",
                        border: "border-l-4 border-red-500"
                      };
                    }
                    
                    // Formato normal según tipo
                    switch (type) {
                      case "Llamada":
                        return {
                          bg: "bg-blue-100",
                          text: "text-blue-800",
                          icon: "text-blue-600",
                          border: ""
                        };
                      case "Correo":
                        return {
                          bg: "bg-purple-100",
                          text: "text-purple-800",
                          icon: "text-purple-600",
                          border: ""
                        };
                      case "Reunión presencial":
                        return {
                          bg: "bg-orange-100",
                          text: "text-orange-800",
                          icon: "text-orange-600",
                          border: ""
                        };
                      case "Mensaje":
                        return {
                          bg: "bg-green-100",
                          text: "text-green-800",
                          icon: "text-green-600",
                          border: ""
                        };
                      default:
                        return {
                          bg: "bg-gray-100",
                          text: "text-gray-800",
                          icon: "text-gray-600",
                          border: ""
                        };
                    }
                  };

                  const getStatusChip = (status: string, isOverdue: boolean) => {
                    // Si está atrasada, mostrar chip "ATRASADA"
                    if (isOverdue) {
                      return { text: "ATRASADA", bg: "bg-red-200", textColor: "text-red-700" };
                    }
                    
                    // Chips normales según estado
                    switch (status) {
                      case TaskStatus.OPENED:
                        return { text: "Pendiente", bg: "bg-blue-100", textColor: "text-blue-700" };
                      case TaskStatus.PROGRAMED:
                        return { text: "Programada", bg: "bg-yellow-100", textColor: "text-orange-700" };
                      case TaskStatus.COMPLETED:
                        return { text: "Completada", bg: "bg-green-100", textColor: "text-green-700" };
                      default:
                        return { text: "Cerrada", bg: "bg-gray-100", textColor: "text-gray-700" };
                    }
                  };

                  const cardStyle = getTaskCardStyle(task.type, isOverdue);
                  const statusChip = getStatusChip(task.status, isOverdue);

                  return (
                    <div
                      key={task.id}
                      className={`${cardStyle.bg} rounded-lg p-4 flex items-center gap-3 shadow-sm ${cardStyle.border}`}
                    >
                      {/* Icono */}
                      <div className={`p-2 rounded-full ${isOverdue ? 'bg-red-200' : cardStyle.bg}`}>
                        <Icon
                          icon={isOverdue ? 'lucide:alert-triangle' : getTaskIcon(task.type)}
                          className={`w-5 h-5 ${cardStyle.icon}`}
                        />
                      </div>
                      
                      {/* Contenido principal */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${cardStyle.text} truncate`}>
                          {task.type} con {task.advisor}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {dateString}, {timeString}
                        </p>
                      </div>
                      
                      {/* Chip de estado */}
                      <div className={`px-3 py-1 rounded-full ${statusChip.bg}`}>
                        <span className={`text-xs font-medium ${statusChip.textColor}`}>
                          {statusChip.text}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <div className="space-y-2">
                    <Icon icon="lucide:check-circle" className="w-8 h-8 mx-auto text-gray-400" />
                    <p>No hay tareas pendientes</p>
                    <p className="text-sm">Total de tareas: {tasks?.length || 0}</p>
                    <p className="text-sm">Tareas activas: {activeTasks.length}</p>
                  </div>
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
