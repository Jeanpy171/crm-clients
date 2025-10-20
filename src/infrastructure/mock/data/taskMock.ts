import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../domain/valueObjects";

export const taskMocks = [
  {
    id: "1",
    type: "Llamada" as TaskType,
    leadId: "101",
    status: "cancelada" as TaskStatus,
    dueDate: new Date(Date.now() + 3600000).toISOString(), // +1 hora
    duration: 30,
    notes: "Llamar para calificar el lead",
    completionNotes: "",
    priority: "Alta" as TaskPriority,
    advisor: "Juan Pérez",
  },
  {
    id: "2",
    type: "Correo" as TaskType,
    leadId: "102",
    status: "programada" as TaskStatus,
    dueDate: new Date(Date.now() + 7200000).toISOString(), // +2 horas
    duration: 15,
    notes: "Enviar correo con propuesta",
    completionNotes: "",
    priority: "Baja" as TaskPriority,
    advisor: "María Martínez",
  },
  {
    id: "3",
    type: "Reunión presencial" as TaskType,
    leadId: "103",
    status: "programada" as TaskStatus,
    dueDate: new Date(Date.now() - 3600000).toISOString(), // -1 hora
    duration: 60,
    notes: "Reunión inicial con cliente",
    completionNotes: "Cliente interesado en demo",
    priority: "Baja" as TaskPriority,
    advisor: "Lucas Rodríguez",
  },
  {
    id: "4",
    type: "Llamada" as TaskType,
    leadId: "104",
    status: "completada" as TaskStatus,
    dueDate: new Date(Date.now() + 10800000).toISOString(), // +3 horas
    duration: 20,
    notes: "Seguimiento de lead",
    completionNotes: "",
    priority: "Media" as TaskPriority,
    advisor: "Carlos Veracruz",
  },
  {
    id: "5",
    type: "Reunión presencial" as TaskType,
    leadId: "105",
    status: "abierto" as TaskStatus,
    dueDate: new Date(Date.now() + 86400000).toISOString(), // +1 día
    duration: 10,
    notes: "Enviar recordatorio de reunión",
    completionNotes: "",
    priority: "Alta" as TaskPriority,
    advisor: "Ana López",
  },
];
