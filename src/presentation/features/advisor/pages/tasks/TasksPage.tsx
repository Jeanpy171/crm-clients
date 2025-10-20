import React, { useMemo, useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Task } from "../../../../../core/domain/entities/Task";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../../../../core/domain/value-objects/task";
import { useTasks } from "../../../shared/hooks/useTasks";
import CreateTaskModal from "./components/CreateTaskModal";
import { TaskStatusDropdown } from "../../../shared/components/task-status-dropdown/TaskStatusDropdown";
import { TaskTypeDropdown } from "../../../shared/components/task-type-dropdown/TaskTypeDropdown";
import { useTaskStatus } from "../../../shared/hooks/useTaskStatus";
import { useTaskPriorities } from "../../../shared/hooks/useTaskPriorities";
import { useTaskTypes } from "../../../shared/hooks/useTaskTypes";

interface AdvisorTasksProps {
  //   tasks: Task[];
  //   leads: Lead[];
  onCreateTask: () => void;
  onCompleteTask: (taskId: string) => void;
  onCloseTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

const getTaskIcon = (type: Task["type"]) => {
  switch (type) {
    case TaskType.CALL:
      return "lucide:phone";
    case TaskType.MESSAGE:
      return "lucide:message-square";
    case TaskType.EMAIL:
      return "lucide:mail";
    case TaskType.IN_PERSON_MEETING:
      return "lucide:users";
    default:
      return "lucide:check-square";
  }
};

const getTaskStatusColor = (status: Task["status"]) => {
  switch (status) {
    case TaskStatus.OPENED:
      return "bg-amber-100 text-amber-700";
    case TaskStatus.PROGRAMED:
      return "bg-blue-100 text-blue-700";
    case TaskStatus.COMPLETED:
      return "bg-green-100 text-green-700";
    case TaskStatus.CLOSED:
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const TasksPage: React.FC<AdvisorTasksProps> = ({
  //   leads,
  //   onCreateTask,
  onCompleteTask,
  onCloseTask,
  onTaskClick,
}) => {
  const { tasks, error, isLoading, handleSaveTask } = useTasks();
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatus | null>(
    null
  );
  const [taskTypeFilter, setTaskTypeFilter] = useState<TaskType | null>(null);
  const { getStatusDescriptionByName } = useTaskStatus();
  const { getPriorityDescriptionByName } = useTaskPriorities();
  const { getTypeDescriptionByName } = useTaskTypes();
  //   const {
  //     taskStatus,
  //     isLoading: isTaskStatusLoading,
  //     error: taskStatusError,
  //   } = useTaskStatus();
  const leads: Lead[] = [];
  const [isOpenModal, setIsOpenModal] = useState(false);

  const sortedTasks = useMemo(() => {
    const openTasks =
      tasks?.filter(
        (task) =>
          task.status !== TaskStatus.COMPLETED &&
          task.status !== TaskStatus.CLOSED
      ) || [];
    const completedTasks =
      tasks?.filter((task) => task.status === TaskStatus.COMPLETED) || [];
    const canceledTasks =
      tasks?.filter((task) => task.status === TaskStatus.CLOSED) || [];
    return [...openTasks, ...completedTasks, ...canceledTasks];
  }, [tasks]);

  const getLeadName = (leadId: string) => {
    const lead = leads?.find((l) => l.id === leadId);
    return lead ? lead.name : "Cliente desconocido";
  };

  const formatDate = (date: Date) => {
    // const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Mañana, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return (
        date.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }) +
        `, ${date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
    }
  };

  //   const onSaveTask = (taskData: CreateTaskDTO) => {
  //     const newTask = Task.create(taskData);
  //     handleSaveTask(newTask.toJSON());

  //     // const newTask: TaskDTO = {
  //     //   type: taskData.type,
  //     //   leadId: taskData.leadId,
  //     //   status: TaskStatus.OPENED,
  //     //   dueDate: taskData.dueDate,
  //     //   duration: taskData.duration,
  //     //   notes: taskData.notes,
  //     //   priority: taskData.priority || TaskPriority.AVARAGE,
  //     //   advisor: "Juan Pérez", // Assuming current user
  //     // };

  //     console.log("Creating new task:", newTask);
  //     // setTasks((prevTasks) => {
  //     //   const updatedTasks = [...prevTasks, newTask];
  //     //   console.log("Updated tasks array:", updatedTasks);
  //     //   return updatedTasks;
  //     // });
  //     setIsOpenModal(isLoading);
  //   };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Gestión de Tareas
        </h2>
        <Button
          color="primary"
          onPress={() => {
            setIsOpenModal(true);
          }}
          startContent={<Icon icon="lucide:plus" />}
          className="w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Crear Nueva Tarea</span>
          <span className="sm:hidden">Nueva Tarea</span>
        </Button>
      </div>
      <CreateTaskModal
        isOpen={isOpenModal}
        isLoading={isLoading}
        onClose={() => setIsOpenModal(false)}
        onSave={handleSaveTask}
        leads={leads}
      />

      {/* Task Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <TaskStatusDropdown
          value={taskStatusFilter?.toString() ?? ""}
          onChange={setTaskStatusFilter}
        />
        <TaskTypeDropdown
          value={taskTypeFilter?.toString() ?? ""}
          onChange={setTaskTypeFilter}
        />
      </div>

      {/* Tasks List */}
      <div className="space-y-3 sm:space-y-4">
        {isLoading ? (
          <h3>Cargando ....</h3>
        ) : tasks?.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <Icon
              icon="lucide:clipboard-list"
              className="text-4xl sm:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4"
            />
            <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">
              No hay tareas
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Crea una nueva tarea para comenzar.
            </p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <Card key={task.id}>
              <CardBody className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div
                      className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                        task.type === TaskType.CALL
                          ? "bg-blue-100"
                          : task.type === TaskType.MESSAGE
                          ? "bg-green-100"
                          : task.type === TaskType.EMAIL
                          ? "bg-amber-100"
                          : "bg-purple-100"
                      }`}
                    >
                      <Icon
                        icon={getTaskIcon(task.type)}
                        className={`text-sm sm:text-base ${
                          task.type === TaskType.CALL
                            ? "text-blue-600"
                            : task.type === TaskType.MESSAGE
                            ? "text-green-600"
                            : task.type === TaskType.EMAIL
                            ? "text-amber-600"
                            : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base truncate">
                        {getTypeDescriptionByName(task.type)} -{" "}
                        {getLeadName(task.leadId)}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        Cliente: {getLeadName(task.leadId)} •{" "}
                        {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getTaskStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusDescriptionByName(task.status)}
                        {/* {task.status === TaskStatus.OPENED
                          ? "Abierto"
                          : task.status === TaskStatus.PROGRAMED
                          ? "Programada"
                          : task.status === TaskStatus.COMPLETED
                          ? "Completada"
                          : "Cancelada"} */}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          task.priority === TaskPriority.HIGH
                            ? "bg-red-100 text-red-700"
                            : task.priority === TaskPriority.AVARAGE
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {getPriorityDescriptionByName(task.priority)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        variant="light"
                        color="default"
                        onPress={() => onTaskClick(task)}
                        className="text-xs"
                      >
                        <span className="hidden sm:inline">Ver Detalles</span>
                        <span className="sm:hidden">Ver</span>
                      </Button>
                      {task.status !== TaskStatus.OPENED &&
                        task.status !== TaskStatus.COMPLETED && (
                          <>
                            <Button
                              size="sm"
                              variant="light"
                              color="primary"
                              onPress={() => onCompleteTask(task.id)}
                              className="text-xs"
                            >
                              <span className="hidden sm:inline">
                                Completar
                              </span>
                              <span className="sm:hidden">✓</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="light"
                              color="warning"
                              onPress={() => onCloseTask(task.id)}
                              className="text-xs"
                            >
                              <span className="hidden sm:inline">Cerrar</span>
                              <span className="sm:hidden">✕</span>
                            </Button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
