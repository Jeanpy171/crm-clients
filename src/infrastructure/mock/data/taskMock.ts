import {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../../core/domain/value-objects/task";

export const taskMocks = [
  {
    task_id: "1",
    task_type: TaskType.CALL,
    lead_id: "101",
    task_status: TaskStatus.CLOSED,
    due_date: new Date(Date.now() + 3600000).toISOString(), // +1 hora
    duration: 30,
    notes: "Llamar para calificar el lead",
    completion_notes: "",
    priority: TaskPriority.HIGH,
    advisor: "Juan Pérez",
  },
  {
    task_id: "2",
    task_type: TaskType.EMAIL,
    lead_id: "102", // corregido lead_idd -> lead_id
    task_status: TaskStatus.PROGRAMED,
    due_date: new Date(Date.now() + 7200000).toISOString(), // +2 horas
    duration: 15,
    notes: "Enviar correo con propuesta",
    completion_notes: "",
    priority: TaskPriority.LOW,
    advisor: "María Martínez",
  },
  {
    task_id: "3",
    task_type: TaskType.IN_PERSON_MEETING,
    lead_id: "103",
    task_status: TaskStatus.PROGRAMED,
    due_date: new Date(Date.now() - 3600000).toISOString(), // -1 hora
    duration: 60,
    notes: "Reunión inicial con cliente",
    completion_notes: "Cliente interesado en demo",
    priority: TaskPriority.LOW,
    advisor: "Lucas Rodríguez",
  },
  {
    task_id: "4",
    task_type: TaskType.CALL,
    lead_id: "104",
    task_status: TaskStatus.COMPLETED,
    due_date: new Date(Date.now() + 10800000).toISOString(), // +3 horas
    duration: 20,
    notes: "Seguimiento de lead",
    completion_notes: "",
    priority: TaskPriority.AVARAGE,
    advisor: "Carlos Veracruz",
  },
  {
    task_id: "5",
    task_type: TaskType.IN_PERSON_MEETING,
    lead_id: "105",
    task_status: TaskStatus.OPENED,
    due_date: new Date(Date.now() + 86400000).toISOString(), // +1 día
    duration: 10,
    notes: "Enviar recordatorio de reunión",
    completion_notes: "",
    priority: TaskPriority.HIGH,
    advisor: "Ana López",
  },
];

export const taskTypesMock = [
  {
    task_type_id: "237127yhiuwbdkjabd",
    task_type_name: "CALL",
    task_type_description: "Llamada",
  },
  {
    task_type_id: "u98u9hsdofnsdkjbskjdbcs",
    task_type_name: "MESSAGE",
    task_type_description: "Mensaje",
  },
  {
    task_type_id: "y987ysd98hfosidijs",
    task_type_name: "EMAIL",
    task_type_description: "Correo",
  },
  {
    task_type_id: "9i09uoidsjfnsjdn",
    task_type_name: "IN_PERSON_MEETING",
    task_type_description: "Reunion presencial",
  },
];

export const taskStatusMock = [
  {
    task_status_id: "9u8r239rh23orh23irho2i3r",
    task_status_name: "OPENED",
    task_status_description: "Abierta",
  },
  {
    task_status_id: "i92i30rj23ir23orh23ojrbn23",
    task_status_name: "PROGRAMED",
    task_status_description: "Programada",
  },
  {
    task_status_id: "83u79823hruowhefjbekjfbwe",
    task_status_name: "COMPLETED",
    task_status_description: "Completada",
  },
  {
    task_status_id: "23i0283uionjlfnsljfbsd",
    task_status_name: "CLOSED",
    task_status_description: "Cerrada",
  },
];

export const taskPrioritiesMock = [
  {
    task_priority_id: "12312jenfojsdnfos",
    task_priority_name: "HIGH",
    task_priority_description: "Alta",
  },
  {
    task_priority_id: "2323knfpesnfpsdnfs",
    task_priority_name: "AVARAGE",
    task_priority_description: "Media",
  },
  {
    task_priority_id: "9i09jofiweofjbwjefbowjebfw",
    task_priority_name: "LOW",
    task_priority_description: "Baja",
  },
];
