import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import type { Lead } from "../../../../../../core/domain/entities/Lead";
import { Task } from "../../../../../../core/domain/entities/Task";
import {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../../../../../core/domain/value-objects/task";
import type { CreateTaskDTO } from "../../../../../../core/application/dtos/tasks/CreateTaskDTO";
import { TaskTypeDropdown } from "../../../../shared/components/task-type-dropdown/TaskTypeDropdown";
import { TaskPriorityDropdown } from "../../../../shared/components/task-priority-dropdown/TaskPriorityDropdown";

interface CreateTaskModalProps {
  isOpen: boolean;
  isLoading: boolean;
  leads: Lead[];
  onClose: () => void;
  onSave: (taskData: any) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  isLoading,
  leads,
  onClose,
  onSave,
}) => {
  const now = new Date();
  const minDateTime =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "T" +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  const [formData, setFormData] = useState({
    leadId: "",
    type: "",
    dueDate: "",
    duration: 30,
    notes: "",
    priority: TaskPriority.AVARAGE,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveTask(formData);
    setFormData({
      leadId: "",
      type: "",
      dueDate: "",
      duration: 30,
      notes: "",
      priority: TaskPriority.AVARAGE,
    });
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTask = (formData: any) => {
    try {
      let newTask: CreateTaskDTO = {
        type: formData.type,
        leadId: formData.leadId,
        status: TaskStatus.OPENED,
        dueDate: formData.dueDate,
        duration: formData.duration,
        notes: formData.notes,
        priority: formData.priority || TaskPriority.AVARAGE,
        advisor: "Juan Pérez", // Assuming current user
      };
      const task = Task.create(newTask);
      onSave(task.toJSON());

      console.log("Creating new task:", newTask);
      // setTasks((prevTasks) => {
      //   const updatedTasks = [...prevTasks, newTask];
      //   console.log("Updated tasks array:", updatedTasks);
      //   return updatedTasks;
      // });
    } catch (error: any) {
      console.error("Error en el modal de creacion de tarea: ", error);
      addToast({
        title: "Error al guardar la tarea",
        description: error.message || "Error in save task",
        color: "danger",
        timeout: 2500,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" scrollBehavior="inside">
      <ModalContent className="max-w-[95vw] sm:max-w-md">
        <ModalHeader>
          <h3 id="taskModalTitle" className="text-lg sm:text-xl">
            Crear/Editar Tarea
          </h3>
        </ModalHeader>
        <ModalBody>
          <form id="taskForm" onSubmit={handleSubmit}>
            <input type="hidden" id="taskId" />
            <div className="form-group mb-4">
              <label
                htmlFor="taskLead"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lead:
              </label>
              <Select
                id="taskLead"
                placeholder="Seleccionar lead..."
                selectedKeys={formData.leadId ? [formData.leadId] : []}
                onSelectionChange={(keys) => {
                  if (keys !== "all" && keys.size > 0) {
                    handleChange("leadId", Array.from(keys)[0].toString());
                  }
                }}
                required
              >
                {leads?.map((lead) => (
                  <SelectItem key={lead.id}>{lead.name}</SelectItem>
                ))}
              </Select>
            </div>
            <TaskTypeDropdown
              value={formData.type}
              onChange={(value) => {
                setFormData({ ...formData, type: value });
              }}
            />
            {/*<div className="form-group mb-4">
               <label
                htmlFor="taskType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Tarea:
              </label>
              <Select
                id="taskType"
                selectedKeys={formData.type ? [formData.type] : []}
                onSelectionChange={(keys) => {
                  if (keys !== "all" && keys.size > 0) {
                    handleChange("type", Array.from(keys)[0].toString());
                  }
                }}
                required
              >
                <SelectItem key="Llamada">Llamada</SelectItem>
                <SelectItem key="Mensaje">Mensaje</SelectItem>
                <SelectItem key="Correo">Correo</SelectItem>
                <SelectItem key="Reunión presencial">
                  Reunión presencial
                </SelectItem>
              </Select>
            </div> */}
            <div className="form-group mb-4">
              <label
                htmlFor="taskDueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha y Hora Límite:
              </label>
              <Input
                type="datetime-local"
                id="taskDueDate"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                min={minDateTime}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="taskDuration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duración Estimada (minutos):
              </label>
              <Input
                type="number"
                id="taskDuration"
                min="15"
                max="480"
                value={formData.duration.toString()}
                onValueChange={(value) =>
                  handleChange("duration", parseInt(value))
                }
              />
            </div>
            <TaskPriorityDropdown
              value={formData.type}
              onChange={(value) => {
                setFormData({ ...formData, priority: value });
              }}
            />
            {/* <div className="form-group mb-4">
              <label
                htmlFor="taskPriority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prioridad:
              </label>
              <Select
                id="taskPriority"
                selectedKeys={formData.priority ? [formData.priority] : []}
                onSelectionChange={(keys) => {
                  if (keys !== "all" && keys.size > 0) {
                    handleChange("priority", Array.from(keys)[0].toString());
                  }
                }}
                required
              >
                <SelectItem key="Alta">Alta</SelectItem>
                <SelectItem key="Media">Media</SelectItem>
                <SelectItem key="Baja">Baja</SelectItem>
              </Select>
            </div> */}
            <div className="form-group mb-4">
              <label
                htmlFor="taskNotes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notas:
              </label>
              <Textarea
                id="taskNotes"
                rows={3}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            variant="light"
            onPress={onClose}
            id="cancelTask"
          >
            Cancelar
          </Button>
          <Button
            isLoading={isLoading}
            type="submit"
            color="primary"
            form="taskForm"
            id="saveTask"
          >
            Guardar Tarea
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModal;
